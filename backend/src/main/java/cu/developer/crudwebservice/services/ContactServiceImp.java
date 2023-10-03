package cu.developer.crudwebservice.services;

import cu.developer.crudwebservice.dto.AgeRangeDto;
import cu.developer.crudwebservice.dto.ContactDto;
import cu.developer.crudwebservice.dto.mapper.ContactMapper;
import cu.developer.crudwebservice.entities.Contact;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import cu.developer.crudwebservice.repository.ContactRepository;
import java.time.LocalDate;

@Slf4j
@Service
public class ContactServiceImp implements ContactService{

    @Autowired
    ContactRepository repository;

    @Autowired
    ContactMapper mapper;

    @Override
    public List<ContactDto> findAll() {
        List<Contact> contacts = this.repository.findAll();
        return contacts
                .stream()
                .map(i -> mapper.mapTo(i))
                .collect(Collectors.toList());
    }

    @Override
    public List<ContactDto> findByName(String name) {
        List<Contact> contacts = this.repository.findAllByFirstNameContainingOrSecondNameContainingIgnoreCase(name, name);
        List<ContactDto> contactDtos = contacts
                .stream()
                .map(i -> mapper.mapTo(i))
                .collect(Collectors.toList());
        contactDtos.forEach(i -> log.info("Element: {}", i.toString()));
        return contactDtos;
    }
    
    @Override
    public List<ContactDto> findByAddress(String address){
        List<Contact> contacts = this.repository.findAllByAddressesContainingIgnoreCase(address);
        List<ContactDto> contactDtos = contacts
                .stream()
                .map(i -> mapper.mapTo(i))
                .collect(Collectors.toList());
        return contactDtos;
    }

    @Override
    public List<ContactDto> findByAgeInRange(AgeRangeDto ages) {
        LocalDate beginDate = LocalDate.now().minusYears(ages.getMaxAge());
        LocalDate endDate = LocalDate.now().minusYears(ages.getMinAge() + 1);
        List<Contact> contacts = this.repository.findByDayOfBirthBetween(beginDate, endDate);
        List<ContactDto> contactDtos = contacts
                .stream()
                .map(i -> mapper.mapTo(i))
                .collect(Collectors.toList());
        return contactDtos;
    }

    @Override
    public ContactDto saveProfile(Contact contact) {
        Contact c = this.repository.save(contact);
        ContactDto dto = mapper.mapTo(c);
        log.info(dto.toString());
        return mapper.mapTo(c);
    }

    @Override
    public Contact findById(Long id) {
        return this.repository.findById(id).orElseThrow(null);
    }

    @Override
    public Contact updateProfile(Long id, Contact contact) {
        Optional<Contact> contac1 = this.repository.findById(id);
        if(contac1.isPresent()){
            Contact c = contac1.get();
            c.setFirstName(contact.getFirstName());
            c.setSecondName(contact.getSecondName());
            c.setAddresses(contact.getAddresses());
            c.setDayOfBirth(contact.getDayOfBirth());
            c.setPersonalPhoto(contact.getPersonalPhoto());
            c.setPhoneNumbers(contact.getPhoneNumbers());
            return this.repository.save(c);
        } else {
            log.error("Error updating user with id: {}", id);
            return null;
        }
    }

    @Override
    public void deleteProfile(Long id) {
        Optional<Contact> contactToRemove = this.repository.findById(id);
        if(contactToRemove.isPresent()){
            this.repository.delete(contactToRemove.get());
        }else {
            log.error("Error deleting user with id: {}", id);
            throw new IllegalArgumentException("User with id: "+id+" does not exist");
        }
    }
}

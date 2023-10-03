package cu.developer.crudwebservice.dto.mapper;


import cu.developer.crudwebservice.dto.ContactDto;
import cu.developer.crudwebservice.entities.Contact;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;

@Component
public class ContactMapper implements Mapper<Contact, ContactDto> {
    @Override
    public ContactDto mapTo(Contact profile) {
        ContactDto dto = new ContactDto();
        dto.setId(profile.getId());
        dto.setFirstName(profile.getFirstName());
        dto.setSecondName(profile.getSecondName());
        dto.setAddresses(profile.getAddresses());
        dto.setPhoneNumbers(profile.getPhoneNumbers());
        dto.setPersonalPhoto(profile.getPersonalPhoto());
        dto.setDayOfBirth(profile.getDayOfBirth());
        return dto;
    }
}

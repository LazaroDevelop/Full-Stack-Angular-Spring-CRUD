package cu.developer.crudwebservice.dto.mapper;

import cu.developer.crudwebservice.dto.ContactDto;
import cu.developer.crudwebservice.entities.Contact;
import org.springframework.stereotype.Component;

import java.text.ParseException;

@Component
public class ContacDtoMapper implements Mapper<ContactDto, Contact>{
    @Override
    public Contact mapTo(ContactDto dto) throws ParseException {
        Contact p = new Contact();
        p.setId(dto.getId());
        p.setFirstName(dto.getFirstName());
        p.setSecondName(dto.getSecondName());
        p.setAddresses(dto.getAddresses());
        p.setPhoneNumbers(dto.getPhoneNumbers());
        p.setPersonalPhoto(dto.getPersonalPhoto());
        p.setDayOfBirth(dto.getDayOfBirth());
        return p;
    }
}
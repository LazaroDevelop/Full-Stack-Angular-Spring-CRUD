package cu.developer.crudwebservice.services;

import cu.developer.crudwebservice.dto.AgeRangeDto;
import cu.developer.crudwebservice.dto.ContactDto;
import cu.developer.crudwebservice.entities.Contact;

import java.util.List;

public interface ContactService {
    List<ContactDto> findAll();
    List<ContactDto> findByName(String name);
    List<ContactDto> findByAgeInRange(AgeRangeDto dateRange);
    List<ContactDto> findByAddress(String address);
    ContactDto saveProfile(Contact contact);
    Contact findById(Long id);
    Contact updateProfile(Long id, Contact contact);
    void deleteProfile(Long id);
}

package cu.developer.crudwebservice.services;

import cu.developer.crudwebservice.dto.DateRangeDto;
import cu.developer.crudwebservice.dto.ProfileDto;
import cu.developer.crudwebservice.entities.Profile;

import java.util.List;

public interface ProfileService {
    List<ProfileDto> findAll();
    List<ProfileDto> findByFirstName(String firstName);
    List<ProfileDto> findBySecondName(String secondName);
    List<ProfileDto> findByDateOfBirthInRange(DateRangeDto dateRange);
    ProfileDto saveProfile(Profile profile);
    Profile findById(Long id);
    Profile updateProfile(Long id, Profile profile);
    void deleteProfile(Long id);
}

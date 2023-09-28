package cu.developer.crudwebservice.dto.mapper;


import cu.developer.crudwebservice.dto.ProfileDto;
import cu.developer.crudwebservice.entities.Profile;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;

@Component
public class ProfileMapper implements Mapper<Profile, ProfileDto> {
    @Override
    public ProfileDto mapTo(Profile profile) {
        ProfileDto dto = new ProfileDto();
        dto.setId(profile.getId());
        dto.setFirstName(profile.getFirstName());
        dto.setSecondName(profile.getSecondName());
        dto.setAddresses(profile.getAddresses());
        dto.setPhoneNumber(profile.getPhoneNumber());
        dto.setPersonalPicture(profile.getPersonalPicture());
        dto.setBirthDay(profile.getBirthDay());
        return dto;
    }
}

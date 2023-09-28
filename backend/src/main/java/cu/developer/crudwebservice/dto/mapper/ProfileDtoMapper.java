package cu.developer.crudwebservice.dto.mapper;

import cu.developer.crudwebservice.dto.ProfileDto;
import cu.developer.crudwebservice.entities.Profile;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class ProfileDtoMapper implements Mapper<ProfileDto, Profile>{
    @Override
    public Profile mapTo(ProfileDto dto) throws ParseException {
        Profile p = new Profile();
        p.setId(dto.getId());
        p.setFirstName(dto.getFirstName());
        p.setSecondName(dto.getSecondName());
        p.setAddresses(dto.getAddresses());
        p.setPhoneNumber(dto.getPhoneNumber());
        p.setPersonalPicture(dto.getPersonalPicture());
        p.setBirthDay(dto.getBirthDay());
        return p;
    }
}
package cu.developer.crudwebservice.services;

import cu.developer.crudwebservice.dto.DateRangeDto;
import cu.developer.crudwebservice.dto.ProfileDto;
import cu.developer.crudwebservice.dto.mapper.ProfileMapper;
import cu.developer.crudwebservice.entities.Profile;
import cu.developer.crudwebservice.repository.ProfileRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ProfileServiceImp implements ProfileService{

    @Autowired
    ProfileRepository repository;

    @Autowired
    ProfileMapper mapper;

    @Override
    public List<ProfileDto> findAll() {
        List<Profile> profiles = this.repository.findAll();
        List<ProfileDto> profileDtos = profiles
                .stream()
                .map(i -> mapper.mapTo(i))
                .collect(Collectors.toList());
        return profileDtos;
    }

    @Override
    public List<ProfileDto> findByFirstName(String firstName) {
        List<Profile> profiles = this.repository.findAllByFirstName(firstName);
        List<ProfileDto> profileDtos = profiles
                .stream()
                .map(i -> mapper.mapTo(i))
                .collect(Collectors.toList());
        profileDtos.forEach(i -> log.info("Element: {}", i.toString()));
        return profileDtos;
    }

    @Override
    public List<ProfileDto> findBySecondName(String secondName) {
        List<Profile> profiles = this.repository.findAllBySecondName(secondName);
        List<ProfileDto> profileDtos = profiles
                .stream()
                .map(i -> mapper.mapTo(i))
                .collect(Collectors.toList());
        profileDtos.forEach(i -> log.info("Element: {}", i.toString()));
        return profileDtos;
    }

    @Override
    public List<ProfileDto> findByDateOfBirthInRange(DateRangeDto dateRange) {
        List<Profile> profiles = this.repository.findByBirthDayBetween(dateRange.getBeginDate(), dateRange.getEndDate());
        List<ProfileDto> profileDtos = profiles
                .stream()
                .map(i -> mapper.mapTo(i))
                .collect(Collectors.toList());
        return profileDtos;
    }

    @Override
    public ProfileDto saveProfile(Profile profile) {
        Profile p = this.repository.save(profile);
        ProfileDto dto = mapper.mapTo(p);
        log.info(dto.toString());
        return mapper.mapTo(p);
    }

    @Override
    public Profile findById(Long id) {
        return this.repository.findById(id).orElseThrow(null);
    }

    @Override
    public Profile updateProfile(Long id, Profile profile) {
        Optional<Profile> profile1 = this.repository.findById(id);
        if(profile1.isPresent()){
            Profile p = profile1.get();
            p.setFirstName(profile.getFirstName());
            p.setSecondName(profile.getSecondName());
            p.setAddresses(profile.getAddresses());
            p.setBirthDay(profile.getBirthDay());
            p.setPersonalPicture(profile.getPersonalPicture());
            p.setPhoneNumber(profile.getPhoneNumber());
            return this.repository.save(p);
        } else {
            log.error("Error updating user with id: {}", id);
            return null;
        }
    }

    @Override
    public void deleteProfile(Long id) {
        Optional<Profile> profileToRemove = this.repository.findById(id);
        if(profileToRemove.isPresent()){
            this.repository.delete(profileToRemove.get());
        }else {
            log.error("Error deleting user with id: {}", id);
            throw new IllegalArgumentException("User with id: "+id+" does not exist");
        }
    }
}

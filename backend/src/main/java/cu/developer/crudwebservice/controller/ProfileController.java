package cu.developer.crudwebservice.controller;

import cu.developer.crudwebservice.dto.DateRangeDto;
import cu.developer.crudwebservice.dto.ProfileDto;
import cu.developer.crudwebservice.dto.mapper.ProfileDtoMapper;
import cu.developer.crudwebservice.dto.mapper.ProfileMapper;
import cu.developer.crudwebservice.entities.Profile;
import cu.developer.crudwebservice.services.ProfileServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/v1/api")
@CrossOrigin(value = "*", methods = {
        RequestMethod.GET,
        RequestMethod.POST,
        RequestMethod.PUT,
        RequestMethod.DELETE}
)
public class ProfileController {

    @Autowired
    ProfileServiceImp serviceImp;

    @Autowired
    ProfileDtoMapper dtoMapper;

    @Autowired
    ProfileMapper mapper;

    //TODO Cambiar los tipos de retorno a Profile en vez de ProfileDto
    @GetMapping("/all")
    public ResponseEntity<List<ProfileDto>> findAll(){
        List<ProfileDto> profiles = this.serviceImp.findAll();
        if(profiles.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(profiles);
    }

    @GetMapping("/by-first-name/{firstName}")
    public ResponseEntity<List<ProfileDto>> findByFirstName(@PathVariable("firstName") String firstName){
        List<ProfileDto> profiles = this.serviceImp.findByFirstName(firstName);
        if(profiles.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(profiles);
    }

    @GetMapping("/by-second-name/{secondName}")
    public ResponseEntity<List<ProfileDto>> findBySecondName(@PathVariable("secondName") String secondName){
        List<ProfileDto> profiles = this.serviceImp.findBySecondName(secondName);
        if(profiles.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(profiles);
    }

    @PostMapping("/by-id/{id}")
    ResponseEntity<ProfileDto> findProfileById(@PathVariable("id") Long id){
        Profile profile = this.serviceImp.findById(id);
        if(profile == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(mapper.mapTo(profile));
    }

    @PostMapping("/profiles/between-dates")
    ResponseEntity<List<ProfileDto>> findBetweenBithDays(@RequestBody DateRangeDto dto){
        List<ProfileDto> profileDtos = this.serviceImp.findByDateOfBirthInRange(dto);
        if(profileDtos.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(profileDtos);
    }

    @PostMapping("/create-profile")
    public ResponseEntity<ProfileDto> saveProfile(@RequestBody Profile profile){
       ProfileDto newProfile = this.serviceImp.saveProfile(profile);
       return ResponseEntity.ok(newProfile);
    }

    @PutMapping("/modify-profile/{id}")
    public ResponseEntity<String> modifyProfile(@PathVariable("id") Long id, @RequestBody ProfileDto dto) throws ParseException {
        Profile modifyProfile = this.serviceImp.updateProfile(id, dtoMapper.mapTo(dto));
        if(modifyProfile == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("User with id: "+id+ " has been updated");
    }

    @DeleteMapping("/delete-profile/{id}")
    public ResponseEntity<String> deleteProfile(@PathVariable Long id){
        this.serviceImp.deleteProfile(id);
        return ResponseEntity.ok("User with id:" +id+ " has been deleted");
    }

    @GetMapping("/ping")
    public String pingToServer(){
        return "The api is alive...";
    }

}

package cu.developer.crudwebservice.controller;

import cu.developer.crudwebservice.dto.AgeRangeDto;
import cu.developer.crudwebservice.dto.ContactDto;
import cu.developer.crudwebservice.dto.mapper.ContacDtoMapper;
import cu.developer.crudwebservice.dto.mapper.ContactMapper;
import cu.developer.crudwebservice.entities.Contact;
import cu.developer.crudwebservice.services.ContactServiceImp;
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
public class ContactController {

    @Autowired
    ContactServiceImp serviceImp;

    @Autowired
    ContacDtoMapper dtoMapper;

    @Autowired
    ContactMapper mapper;

    @GetMapping("/all")
    public ResponseEntity<List<ContactDto>> findAll(){
        List<ContactDto> profiles = this.serviceImp.findAll();
        if(profiles.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(profiles);
    }

    @GetMapping("/by-name")
    public ResponseEntity<List<ContactDto>> findByName(@RequestParam(name = "name", required = true) String name){
        List<ContactDto> profiles = this.serviceImp.findByName(name);
        if(profiles.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(profiles);
    }

    @PostMapping("/by-id/{id}")
    ResponseEntity<ContactDto> findProfileById(@PathVariable("id") Long id){
        Contact profile = this.serviceImp.findById(id);
        if(profile == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(mapper.mapTo(profile));
    }

    @PostMapping("/contacts/between-age-range")
    ResponseEntity<List<ContactDto>> findBetweenAgeRange(@RequestBody AgeRangeDto dto){
        List<ContactDto> profileDtos = this.serviceImp.findByAgeInRange(dto);
        if(profileDtos.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(profileDtos);
    }

    @PostMapping("/create-profile")
    public ResponseEntity<ContactDto> saveProfile(@RequestBody Contact profile){
       ContactDto newProfile = this.serviceImp.saveProfile(profile);
       return ResponseEntity.ok(newProfile);
    }

    @PutMapping("/modify-profile/{id}")
    public ResponseEntity<String> modifyProfile(@PathVariable("id") Long id, @RequestBody ContactDto dto) throws ParseException {
        Contact modifyProfile = this.serviceImp.updateProfile(id, dtoMapper.mapTo(dto));
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

package cu.developer.crudwebservice.entities;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.CollectionTable;
import javax.persistence.ElementCollection;
import javax.persistence.JoinColumn;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    private String firstName;
    
    private String secondName;
    
    @ElementCollection
    @CollectionTable(name = "addresses", joinColumns = @JoinColumn(name = "contact_id"))
    private List<String> addresses;
    
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dayOfBirth;
    
    @ElementCollection
    @CollectionTable(name = "phone_numbers", joinColumns = @JoinColumn(name = "contact_id"))
    private List<String> phoneNumbers;

    private String personalPhoto;
}

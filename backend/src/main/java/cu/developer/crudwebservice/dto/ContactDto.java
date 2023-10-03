package cu.developer.crudwebservice.dto;


import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactDto {
    private Long id;
    private String firstName;
    private String secondName;
    private List<String> addresses;
    private LocalDate dayOfBirth;
    private List<String> phoneNumbers;
    private String personalPhoto;
}

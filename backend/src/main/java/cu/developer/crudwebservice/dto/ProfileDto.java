package cu.developer.crudwebservice.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDto {
    private Long id;
    private String firstName;
    private String secondName;
    private String addresses;
    private Date birthDay;
    private String phoneNumber;
    private String personalPicture;
}

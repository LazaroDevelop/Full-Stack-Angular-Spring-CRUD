package cu.developer.crudwebservice.dto.mapper;

import java.text.ParseException;

public interface Mapper <I, O>{
    O mapTo(I i) throws ParseException;
}

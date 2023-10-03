package cu.developer.crudwebservice.repository;

import cu.developer.crudwebservice.entities.Contact;
import java.time.LocalDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    List<Contact> findAllByFirstNameContainingOrSecondNameContainingIgnoreCase(String firstName, String secondName);
    List<Contact> findByDayOfBirthBetween(LocalDate beginDate, LocalDate endDate);
    List<Contact> findAllByAddressesContainingIgnoreCase(String Address);
}

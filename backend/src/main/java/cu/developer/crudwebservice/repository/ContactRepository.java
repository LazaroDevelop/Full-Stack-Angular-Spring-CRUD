package cu.developer.crudwebservice.repository;

import cu.developer.crudwebservice.entities.Contact;
import java.time.LocalDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    List<Contact> findAllByFirstNameContainingOrSecondNameContainingIgnoreCase(String firstName, String secondName);
    List<Contact> findByDayOfBirthBetween(LocalDate beginDate, LocalDate endDate);

    @Query(
            value = "SELECT C.*, P.PHONE_NUMBERS, A.ADDRESSES FROM CONTACT C " +
                    "JOIN ADDRESSES A ON C.ID = A.CONTACT_ID " +
                    "JOIN PHONE_NUMBERS P ON C.ID = P.CONTACT_ID " +
                    " WHERE A.ADDRESSES LIKE %:address%",
            nativeQuery = true)
    List<Contact> findAllByAddressesContains(@Param("address") String address);
}

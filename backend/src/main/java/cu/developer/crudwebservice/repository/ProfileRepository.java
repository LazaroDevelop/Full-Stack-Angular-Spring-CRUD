package cu.developer.crudwebservice.repository;

import cu.developer.crudwebservice.entities.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
    List<Profile> findAllByFirstName(String firstName);
    List<Profile> findAllBySecondName(String secondName);
    List<Profile> findByBirthDayBetween(Date beginDate, Date endDate);
}

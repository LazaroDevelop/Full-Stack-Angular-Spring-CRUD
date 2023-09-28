package cu.developer.crudwebservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class CrudWebServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CrudWebServiceApplication.class, args);
    }

}

package com.example.demo2;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;
import java.security.Key;

@RestController
class DataController {

	private final Entityrepo myEntityRepository;
    private final UserRepository userRepository;
    private final Taskrepo taskrepo;
    String token=null;
    @Autowired
    public DataController(Entityrepo myEntityRepository, UserRepository userRepository, Taskrepo taskrepo) {
        this.myEntityRepository = myEntityRepository;
        this.userRepository = userRepository;
        this.taskrepo = taskrepo;
    }
    @PostMapping("/")
    @CrossOrigin(origins = "*")
    public TaskRequest createMyEntity(@RequestBody TaskRequest user) {
    	taskrepo.save(user.getTask());
    	
        return user;
        }
    @RequestMapping("/pop")
    public List<UserT> getAllEntities() {
    	return userRepository.findAll();
    }
    @PostMapping("/register")
    @CrossOrigin(origins = "*")
    public UserT registerUserDetails(@RequestBody UserT userDetails) {
        // You can perform validation or additional processing here if needed
        return userRepository.save(userDetails);
    }

    @PostMapping("/login")
    @CrossOrigin(origins = "*")
    public JwtResponse loginUser(@RequestBody UserT loginDetails) {
        // Assuming loginDetails contain the email and password for authentication
        String email = loginDetails.getEmail();
        String password = loginDetails.getPassword();
        JwtResponse j = null;
        // Check if the user exists in the database
        UserT user = userRepository.findByEmail(email);

        if (user != null && user.getPassword().equals(password)) {
            // User exists and password matches, generate JWT token
            String token = generateJwtToken(user.getEmail());
             j = new JwtResponse(token);
            return j;
        } else {
            // User does not exist or password doesn't match, return an error message
            return j;
        }
    }
    
    @PostMapping("/add")
    @CrossOrigin(origins = "*")
    public TaskRequest addTask(@RequestBody TaskRequest user) {
        String token = user.getToken();
        

        if (token != null)  {
            // Token is valid, proceed to store the task details
        	String a = verifyJwt(token);
        	user.getTask().setEmail(a);
        	taskrepo.save(user.getTask());
            
            return user;
        } else {
            // Token is invalid or missing, return an error message
            return user;
        }
    }

    @GetMapping("/get")
    @CrossOrigin(origins = "*")
    public List<Task2> getTask(@RequestHeader("token") String token) {
        
        
        if (token != null)  {
            // Token is valid, proceed to store the task details
        	String a = verifyJwt(token);
        	List<Task2> t = taskrepo.findByEmail(a);
        	
        	
            return t;
        } else {
            // Token is invalid or missing, return an error message
            return null;
        }
    }
    
    @SuppressWarnings("deprecation")
	private String generateJwtToken(String userEmail) {
        return Jwts.builder()
                .setSubject(userEmail)
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS512,"AbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyz")
                .compact();
    }
    
    @SuppressWarnings("deprecation")
	private static String verifyJwt(String jwt) {
        return Jwts.parserBuilder()
                .setSigningKey("AbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyz")
                .build()
                .parseClaimsJws(jwt)
                .getBody()
                .getSubject();
    }
}

class JwtResponse {
    private String token;

    // Constructors, getters, setters, etc.

    public JwtResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}






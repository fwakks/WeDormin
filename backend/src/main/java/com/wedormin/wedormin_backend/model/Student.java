package com.wedormin.wedormin_backend.model;

import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "student", schema = "public")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ruid; // Not really RUID, just some random id

    private String name;
    private String email;
    private String oauthId;
    private Integer age;
    private String gender;
    private String class_year;
    private String major;
    private String about_me;
    private String likes;
    private String dislikes;
    private String instagram_username;
    private String linkedin_link;
    private String housing_preference;
    private Integer lottery_number;
    private Integer seniority_points;
    private String image;

    @Column(columnDefinition = "vector(1536)", nullable = true)
    @JdbcTypeCode(SqlTypes.VECTOR)
    private float[] embedding;

    // Constructors
    public Student() {}

    public Student(Long ruid, String name, String email, String oauthId, int age, String gender, String class_year, String major, 
                   String about_me, String likes, String dislikes, String instagram_username, String linkedin_link, 
                   String housing_preference, Integer lottery_number, Integer seniority_points, String image) {
        this.ruid = ruid;
        this.name = name;
        this.email = email;
        this.oauthId = oauthId;
        this.age = age;
        this.gender = gender;
        this.class_year = class_year;
        this.major = major;
        this.about_me = about_me;
        this.likes = likes;
        this.dislikes = dislikes;
        this.instagram_username = instagram_username;
        this.linkedin_link = linkedin_link;
        this.housing_preference = housing_preference;
        this.lottery_number = lottery_number;
        this.seniority_points = seniority_points;
        this.image = image;
        this.embedding = null;
    }

    // Getters and setters
    public Long getRuid() { return ruid; }
    public void setRuid(Long ruid) { this.ruid = ruid; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getOauthId() { return oauthId; }
    public void setOauthId(String oauthId) { this.oauthId = oauthId; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public String getClass_year() { return class_year; }
    public void setClass_year(String class_year) { this.class_year = class_year; }
    public String getMajor() { return major; }
    public void setMajor(String major) { this.major = major; }
    public String getAbout_me() { return about_me; }
    public void setAbout_me(String about_me) { this.about_me = about_me; }
    public String getLikes() { return likes; }
    public void setLikes(String likes) { this.likes = likes; }
    public String getDislikes() { return dislikes; }
    public void setDislikes(String dislikes) { this.dislikes = dislikes; }
    public String getInstagram_username() { return instagram_username; }
    public void setInstagram_username(String instagram_username) { this.instagram_username = instagram_username; }
    public String getLinkedin_link() { return linkedin_link; }
    public void setLinkedin_link(String linkedin_link) { this.linkedin_link = linkedin_link; }
    public String getHousing_preference() { return housing_preference; }
    public void setHousing_preference(String housing_preference) { this.housing_preference = housing_preference; }
    public Integer getLottery_number() { return lottery_number; }
    public void setLottery_number(Integer lottery_number) { this.lottery_number = lottery_number; }
    public Integer getSeniority_points() { return seniority_points; }
    public void setSeniority_points(Integer seniority_points) { this.seniority_points = seniority_points; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public float[] getEmbedding() { return embedding; }
    public void setEmbedding(float[] embedding) { this.embedding = embedding; }
}
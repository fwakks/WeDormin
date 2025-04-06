package com.wedormin.wedormin_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
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
    private Integer chosen_housing_id;
    private Integer chosen_student_id;

    @Column(columnDefinition = "vector(1536)", nullable = true)
    @JdbcTypeCode(SqlTypes.VECTOR)
    private float[] embedding;

}
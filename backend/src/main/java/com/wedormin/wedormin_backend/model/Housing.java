package com.wedormin.wedormin_backend.model;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Housing {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long housing_id;

    private String name;
    private String address;
    private int num_residents;
    private int num_rooms;
    private String amenities;
    private BigDecimal price;
    private String image;

    public Housing() {
    }

    public Housing(Long housing_id, String name, String address, int num_rooms, int num_residents, String amenities, BigDecimal price, String image) {
        this.housing_id = housing_id;
        this.name = name;
        this.address = address;
        this.num_rooms = num_rooms;
        this.num_residents = num_residents;
        this.amenities = amenities;
        this.price = price;
        this.image = image;
    }

    public Long getHousing_id() {
        return housing_id;
    }

    public void setHousing_id(Long housing_id) {
        this.housing_id = housing_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getNum_rooms() {
        return num_rooms;
    }

    public void setNum_rooms(int num_rooms) {
        this.num_rooms = num_rooms;
    }

    public int getNum_residents() {
        return num_residents;
    }

    public void setNum_residents(int num_residents) {
        this.num_residents = num_residents;
    }

    public String getAmenities() {
        return amenities;
    }

    public void setAmenities(String amenities) {
        this.amenities = amenities;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

}

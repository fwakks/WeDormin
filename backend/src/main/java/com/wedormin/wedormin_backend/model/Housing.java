package com.wedormin.wedormin_backend.model;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;

@Entity
@Table(name = "housing")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Housing {

    @Id
    private Long housing_id;

    private String name;
    private String address;
    private String amenities;
    private BigDecimal price;
    private int num_residents;
    private String image;
    private String location_type;
    private boolean availability;

    public Housing() {
    }

    public Housing(Long housing_id, String name, String address, String amenities, BigDecimal price, int num_residents,
            String image, String location_type, boolean availability) {
        this.housing_id = housing_id;
        this.name = name;
        this.address = address;
        this.amenities = amenities;
        this.price = price;
        this.num_residents = num_residents;
        this.image = image;
        this.location_type = location_type;
        this.availability = availability;
    }

    public Long getHousing_id() { return housing_id; }
    public void setHousing_id(Long housing_id) { this.housing_id = housing_id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getAmenities() { return amenities; }
    public void setAmenities(String amenities) { this.amenities = amenities; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public int getNum_residents() { return num_residents; }
    public void setNum_residents(int num_residents) { this.num_residents = num_residents; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getLocation_type() { return location_type; }
    public void setLocation_type(String location_type) { this.location_type = location_type; }

    public boolean isAvailability() { return availability; }
    public void setAvailability(boolean availability) { this.availability = availability; }

}

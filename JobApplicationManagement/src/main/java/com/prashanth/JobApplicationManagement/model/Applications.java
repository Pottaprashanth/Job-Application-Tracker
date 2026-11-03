package com.prashanth.JobApplicationManagement.model;

import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "applications")
public class Applications {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	String applicantName;
	String companyName;
	String jobRole;
	String location;
	LocalDate applicationDate;
	String status;
	String salary;
	
}

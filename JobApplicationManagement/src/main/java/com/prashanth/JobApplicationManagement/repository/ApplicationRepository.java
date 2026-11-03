package com.prashanth.JobApplicationManagement.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prashanth.JobApplicationManagement.model.Applications;

public interface ApplicationRepository extends JpaRepository<Applications, Integer> {
	   List<Applications> findByStatus(String status);

	    List<Applications> findByCompanyNameContainingIgnoreCase(
	        String companyName
	    );
	    List<Applications> findByJobRole(String jobRole);
	    
	    List<Applications> findByApplicationDateBetween(
	            LocalDate startDate,
	            LocalDate endDate);
}
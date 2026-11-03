package com.prashanth.JobApplicationManagement.service;

import java.time.LocalDate;
import java.util.List;

import com.prashanth.JobApplicationManagement.model.Applications;

public interface ApplicationService {

	Applications saveApplication(Applications a);

	Applications getApplication(Integer id);

	void deleteApplication(Integer id);
	

	List<Applications> getAllApplications();

	Applications updateApplication(Integer id, Applications a);

	List<Applications> findByStatus(String status);

	List<Applications> findByCompanyNameContainingIgnoreCase(String companyName);
	List<Applications> findByJobRole(String jobRole);
	List<Applications> findByApplicationDateBetween(
	        LocalDate startDate,
	        LocalDate endDate);
}

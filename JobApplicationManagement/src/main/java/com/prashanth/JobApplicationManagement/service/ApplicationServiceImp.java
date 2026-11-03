package com.prashanth.JobApplicationManagement.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prashanth.JobApplicationManagement.model.Applications;
import com.prashanth.JobApplicationManagement.repository.ApplicationRepository;

@Service
public class ApplicationServiceImp implements ApplicationService {
	@Autowired
	ApplicationRepository applicationRepository;

	@Override
	public Applications saveApplication(Applications a) {

		return applicationRepository.save(a);
	}

	@Override
	public Applications getApplication(Integer id) {

		return applicationRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Application not found with ID: " + id));
	}

	@Override
	public void deleteApplication(Integer id) {
		Applications applications = applicationRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Application not found with ID: " + id));
		applicationRepository.delete(applications);
	}

	@Override
	public List<Applications> getAllApplications() {

		return applicationRepository.findAll();
	}

	@Override
	public Applications updateApplication(Integer id, Applications a) {

		Applications exsitingapplications = applicationRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Application not found with ID: " + id));
		exsitingapplications.setApplicantName(a.getApplicantName());
		exsitingapplications.setCompanyName(a.getCompanyName());
		exsitingapplications.setJobRole(a.getJobRole());
		exsitingapplications.setLocation(a.getLocation());
		exsitingapplications.setApplicationDate(a.getApplicationDate());
		exsitingapplications.setStatus(a.getStatus());
		exsitingapplications.setSalary(a.getSalary());

		return applicationRepository.save(exsitingapplications);
	}

	@Override
	public List<Applications> findByStatus(String status) {
		return applicationRepository.findByStatus(status);
	}

	@Override
	public List<Applications> findByCompanyNameContainingIgnoreCase(String companyName) {

		return applicationRepository.findByCompanyNameContainingIgnoreCase(companyName);
	}
	@Override
	public List<Applications> findByJobRole(String jobRole) {
	    return applicationRepository.findByJobRole(jobRole);
	}
	@Override
	public List<Applications> findByApplicationDateBetween(
	        LocalDate startDate,
	        LocalDate endDate) {

	    return applicationRepository
	            .findByApplicationDateBetween(startDate, endDate);
	}

}

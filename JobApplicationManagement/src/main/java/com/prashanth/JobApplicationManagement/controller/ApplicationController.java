package com.prashanth.JobApplicationManagement.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.prashanth.JobApplicationManagement.model.Applications;
import com.prashanth.JobApplicationManagement.service.ApplicationService;
@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://job-application-frontend-bqdi.onrender.com"
})
@RestController
@RequestMapping("/api/applications")
public class ApplicationController {
    @Autowired
     ApplicationService applicationService;

   

    // CREATE
    @PostMapping("/add")
    public Applications addApplication(
            @RequestBody Applications application) {

        return applicationService.saveApplication(application);
    }

    // GET ALL
    @GetMapping("/getall")
    public List<Applications> getAllApplications() {

        return applicationService.getAllApplications();
    }

    // GET BY ID
    @GetMapping("/getbyid/{id}")
    public Applications getApplication(
            @PathVariable Integer id) {

        return applicationService.getApplication(id);
    }

    // UPDATE
    @PutMapping("/update/{id}")
    public Applications updateApplication(
            @PathVariable Integer id,
            @RequestBody Applications application) {

        return applicationService.updateApplication(id, application);
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public String deleteApplication(
            @PathVariable Integer id) {

    	applicationService.deleteApplication(id);

        return "Application deleted successfully";
    }

    // SEARCH BY STATUS
    @GetMapping("/status/{status}")
    public List<Applications> findByStatus(
            @PathVariable String status) {

        return applicationService.findByStatus(status);
    }

    // SEARCH BY COMPANY
    @GetMapping("/company")
    public List<Applications> findByCompanyName(
            @RequestParam String name) {

        return applicationService.findByCompanyNameContainingIgnoreCase(name);
    }

    // SEARCH BY JOB ROLE
    @GetMapping("/jobrole")
    public List<Applications> findByJobRole(
            @RequestParam String role) {

        return applicationService.findByJobRole(role);
    }

    // SEARCH BY APPLICATION DATE RANGE
    @GetMapping("/date-range")
    public List<Applications> findByApplicationDateBetween(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {

        return applicationService.findByApplicationDateBetween(
                startDate, endDate);
    }
}

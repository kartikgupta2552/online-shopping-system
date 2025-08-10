package com.apnacart.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    public final JavaMailSender mailSender;

    public void sendWelcomeMail(String to, String userName) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");

        helper.setTo(to);
        helper.setSubject("Welcome to ApnaCart!");
        helper.setText("Hey " + userName + ",<br><br>Welcome to ApnaCart. Shop till you drop.<br><br>Cheers 🍻,<br>ApnaCart Crew", true);

        mailSender.send(message);
    }//sendWelcomeMail() ends

}//EmailService

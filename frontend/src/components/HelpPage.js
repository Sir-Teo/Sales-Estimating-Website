// components/HelpPage.js
import React from 'react';
import { Container, Paper, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function HelpPage() {
  const faqData = [
    {
      question: "How do I create a new prediction?",
      answer: "To create a new prediction, log in to your account and navigate to the main dashboard. Click on the 'New Prediction' button and fill in the required information. Once you've entered all the details, click 'Submit' to generate your prediction."
    },
    {
      question: "Can I save my predictions?",
      answer: "Yes, you can save your predictions for future reference. After generating a prediction, you'll see a 'Save' button. Click this to store the prediction in your account. You can access saved predictions from the 'Saved Predictions' section."
    },
    {
      question: "How accurate are the predictions?",
      answer: "Our predictions are based on advanced machine learning algorithms and historical data. While we strive for high accuracy, please note that various external factors can influence actual sales. We recommend using our predictions as a guide alongside other business insights."
    },
    {
      question: "I'm having trouble logging in. What should I do?",
      answer: "If you're experiencing login issues, first ensure that you're using the correct email and password. If you've forgotten your password, use the 'Forgot Password' link on the login page. If problems persist, please contact our support team at support@tmba.com."
    }
  ];

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ mt: 4, p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Help Center
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to the TMBA Sales Estimation Prediction Help Center. Here you'll find answers to frequently asked questions and guidance on using our platform.
        </Typography>
        {faqData.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
        <Typography variant="body1" sx={{ mt: 4 }}>
          If you need further assistance, please don't hesitate to contact our support team at support@tmba.com.
        </Typography>
      </Paper>
    </Container>
  );
}

export default HelpPage;
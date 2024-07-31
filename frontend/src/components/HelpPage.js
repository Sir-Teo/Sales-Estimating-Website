
// components/HelpPage.js
import React from 'react';
import { Container, Paper, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function HelpPage() {
  const faqData = [
    {
      question: "How do I create a new prediction?",
      answer: "To create a new prediction, log in to your account and navigate to the main dashboard. Click on the 'New Prediction' button and fill in the required information. Once you've entered all the details, click 'Submit' to generate your prediction."
    },
    {
      question: "Can I save my predictions?",
      answer: "Yes, you can save your predictions for future reference. Your predictions are automatically saved everytime you make one. You can access saved predictions from the 'Saved Predictions' section."
    },
    {
      question: "How accurate are the predictions?",
      answer: "Our predictions are based on advanced machine learning algorithms and historical data. While we strive for high accuracy, please note that various external factors can influence actual sales. We recommend using our predictions as a guide alongside other business insights."
    },
    {
      question: "I'm having trouble logging in. What should I do?",
      answer: "If you're experiencing login issues, first ensure that you're using the correct email and password. If you've forgotten your password, you can reset it by clicking on the 'Forgot Password' link on the login page. If the problem persists, you may consider registering a new account or contacting our support team."
    }
  ];

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ mt: 4, p: 4, backgroundColor: '#f5f5f5', borderRadius: '15px' }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Help Center
        </Typography>
        <Typography variant="body1" paragraph align="justify">
          Welcome to the Sales Estimating Website Help Center. Here you'll find answers to frequently asked questions and guidance on using our platform.
        </Typography>
        {faqData.map((faq, index) => (
          <Accordion key={index} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" align="justify">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body1">
            If you need further assistance, please don't hesitate to contact Teo <a href="mailto:support@tmba.com">teoz@tmba.com</a>.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default HelpPage;

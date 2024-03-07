import React from 'react';
import { Container, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Gamepad as GamepadIcon, LocalOffer as LocalOfferIcon, EmojiObjects as LightbulbIcon } from '@material-ui/icons';

export default function Highlights() {
    return (
        <Container className="mt-4">
            <h2 className="text-center">Explore Gaming Hub</h2>
            <Accordion className="mt-4">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="wide-selection-content"
                    id="wide-selection-header"
                >
                    <GamepadIcon />
                    <Typography>Wide Selection of Games</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Explore a variety of video games, gaming accessories, consoles, and more to elevate your gaming experience.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion className="mt-4">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="exclusive-deals-content"
                    id="exclusive-deals-header"
                >
                    <LocalOfferIcon />
                    <Typography>Exclusive Gaming Deals</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Enjoy special discounts and exclusive deals on premium gaming products. Find top-quality items at affordable prices.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion className="mt-4">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="expert-advice-content"
                    id="expert-advice-header"
                >
                    <LightbulbIcon />
                    <Typography>Gaming Expert Advice</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Our knowledgeable staff is here to provide expert advice on choosing the right gaming gear and accessories for your needs.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Container>
    );
}

import React from 'react'
import BrewerBio from './BrewerBio'
import Wrapper from './Wrapper'
import Content from './Content'
import MattBrewcaster from '../images/matt_brewcaster.jpg'
import Nate from '../images/nate.jpg'
import Andy from '../images/beer_science.jpg'

export default class About extends React.Component {
    brewers = [
        {
            img: MattBrewcaster, 
            name: 'Matt Brewcaster',
            bio: 'You know who I am.  Been brewing beer since 2002, and an enthusiast my whole life. Some call me a booze mage, or brew wizard, though I prefer Beercaster.  I prefer my brown ales but also love hoppy beers.  Sours remind me of all the batches I botched, but still drank, so there is a bit of a love hate thing going on there. What I love most about brewing is spending time with my fellow brewers and knocking a few back while we wait for the boil.  Though this is undoubtedly the reason many of our beers have failed to live up to their potential.  I think this is why distilling goes hand and hand with brewing, as no batch goes to waste.  I also love going out with my fellow brewers to do research on our next batch by sampling several examples of a given style so we can dream up our own custom recipes. I would love to one day have a dedicated brew space where we can get right to work and not have to spend half the day doing set up and tear down. I think the quality of our work will go up dramatically. That may be a goal that is out of reach at this point in time, but one must have goals.'
        },
        {
            img: Nate,
            name: 'Nate Bunghammer',
            bio: "Constructor of the six tap keezer, maker of the homemade keg scale, engineer of the beerroom monitor and this website, with a demeanor as sour as the beers I enjoy, if you don't stick to the plan you'll get the big end of the bunghammer. Representing the 'N' in MAN Brewing, I bring up the rear and keep a watchful eye on the other hooligans both while brewing and any other time we may enjoy each other's company. I prefer Belgian sours over lambics or fruit sours and my one true love is her highness, the Duchesse de Bourgogne, though I have been know to crush a brown ale or six. "
        },
        {
            img: Andy,
            name: 'Doktor Andy',
            bio: "He'll diagnose you with ugly so he can prescribe himself a strong ale until your symptoms subside."
        }
    ];

    render() {
        return(
            <Wrapper>
                <Content>
                    {this.brewers.map(brewer => {
                        return <BrewerBio brewer={brewer}/>
                    })}                   
                </Content>
            </Wrapper>
        )
    }
}
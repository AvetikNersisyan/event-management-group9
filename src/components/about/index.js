import { useState } from "react";
import { useSelector } from "react-redux";
import './feedback.css'

const About = () => {
    const feedbacks = useSelector(({ FeedbackDuck }) => FeedbackDuck.feedbacks);

    console.log(feedbacks);
    return (
        <div className="about-page global-container">
            <div>
                <h1>ABOUT US</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at ipsum purus. Donec mollis dui sed dui dictum sagittis. Vivamus eleifend quam non consequat dictum. Nulla facilisi. In at luctus leo. Pellentesque dictum tempor purus in pulvinar. Curabitur ligula turpis, sodales non velit et, pharetra maximus lorem.
                    Aliquam faucibus, lectus vel facilisis venenatis, magna nisi laoreet dui, sed pretium dolor leo eu ligula. Mauris risus lacus, congue vel elementum at, ullamcorper vel turpis. Nullam semper egestas aliquet. Donec pulvinar placerat tellus et condimentum. Donec in felis tellus. Pellentesque hendrerit fermentum dolor sit amet aliquet. Nullam at ultrices neque. Aenean malesuada neque sed quam varius lacinia. Nulla sodales, tellus quis aliquam imperdiet, leo mauris commodo turpis, ac rhoncus arcu quam eget libero. Nulla faucibus ipsum vitae nulla congue, at vehicula libero consectetur. Donec lacinia turpis ut euismod commodo. Aliquam vitae vehicula tortor. Duis convallis nibh ut lorem auctor feugiat. In ac tempus neque, in commodo nisi. Ut feugiat condimentum ante eu pharetra. Phasellus pellentesque lacinia nisl quis tincidunt.
                    Aliquam varius congue sem, a accumsan ipsum dapibus a. Aliquam hendrerit, neque ac vestibulum tempus, ipsum felis commodo massa, eu accumsan velit lectus in arcu. Phasellus dapibus pretium turpis id accumsan. Nulla ut dapibus orci, rhoncus feugiat nisl. Sed vel suscipit turpis, in dictum quam. Sed elit mi, rhoncus ut massa vel, semper vulputate mauris. Phasellus rhoncus iaculis tempor.
                    Nullam dapibus semper massa, ornare venenatis augue hendrerit eget. Suspendisse turpis libero, varius ut augue quis, iaculis viverra nunc. Mauris sit amet urna risus. Nulla vitae elementum nunc, non feugiat nulla. Sed posuere porta ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida nec massa eu faucibus. Morbi iaculis gravida dapibus. Etiam egestas egestas accumsan. Nam faucibus, ipsum sit amet porta ultrices, ipsum velit iaculis enim, laoreet tempor sem dui vitae ipsum. Aenean ut ultricies ante. Vivamus id lacus pulvinar, fermentum magna eu, pulvinar metus.
                    Maecenas bibendum viverra est, in egestas felis ullamcorper sit amet. Cras ut sapien eu purus venenatis facilisis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas et est scelerisque, finibus purus eu, lacinia metus. Vivamus fringilla aliquet libero nec pulvinar. Duis posuere orci vel dui eleifend dignissim. Morbi id fringilla tortor, at hendrerit nisl. In nec justo id odio imperdiet viverra. Donec volutpat urna porttitor, euismod nulla et, dignissim arcu. Suspendisse iaculis porta erat, sit amet rhoncus ipsum.
                    Fusce hendrerit consequat justo, sed pretium leo viverra at. Maecenas imperdiet hendrerit varius. Maecenas sed sem massa. Fusce ex libero, lacinia non porta nec, auctor elementum odio. Nullam bibendum ante purus, pellentesque auctor enim semper ac. Vivamus placerat elit lectus, nec hendrerit nulla tincidunt vel. Nunc ultricies posuere augue. Praesent scelerisque augue sed risus vestibulum, eget sollicitudin purus tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam consectetur accumsan augue eget rutrum.
                    Nam efficitur dignissim lectus non fermentum. Sed felis metus, laoreet eget eros rhoncus, maximus pulvinar eros. Aenean urna sem, gravida ut scelerisque at, interdum nec turpis. Pellentesque.
                </p>
            </div>
            <div>
                <h1>FEEDBACKS</h1>
                {feedbacks.map((item) =>
                    <div className="single-comment">
                        <div>{item.sender}</div>
                        <div>{item.text}</div>
                        <div>{Intl.DateTimeFormat('ru').format(item.date)}{' '}{item.time}</div>
                    </div>)}
            </div>
        </div>
    )
}

export default About;
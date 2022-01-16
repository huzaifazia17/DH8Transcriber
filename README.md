# DH8Transcriber

## Inspiration
In light of the pandemic, many of us have moved online, whether it may be for school or work. We, personally, have gone through almost 2 years of lectures online through google meet, webex, zoom, and teams. There have been countless times where we missed or skipped an online lecture due to it being online and various other circumstances. This project was inspired by the countless hours we have spent watching recorded lecture videos with minimal important information. After using this product, we can now quickly have our long lecture videos summarized into important topics and chapters. Furthermore, a textual format allows the user to quickly and easily reference the content again in the future.

## What it does
Robo-Summ uses AssemblyAI’s transcription API to transcribe an audio or video file and reduces it down to bite sized pieces of information where only the important parts are brought to light, but further information is available under "Content" headers.

## How we built it
We used a combination of web development tools to create this project. This included JavaScript, HTML, and CSS as well as Visual Studio Code as the IDE. The core speech-to-text functionality comes from the use of AssemblyAI's free API. We used the auto-chapter feature in combination with the paragraphing feature to help us create an organized and highly readable document.

## Challenges we ran into
We ran into problems when implementing a loading icon while the program is processing a file. To combat this challenge, we opted for a simpler approach of changing the "Run" button's text to indicate that the program is "Processing...". We also weren't sure how we would link the transcribed text to the auto-generated chapters. To solve this, we used the timestamps attached to each chapter and paragraph to determine which paragraphs belong in each chapter.

## Accomplishments that we're proud of
We're proud that we were able to come up with an idea that we feel can be useful to a lot of people. We're also proud to have been able to build a working prototype of our idea. Finally, we're proud to have each applied and learned a variety of different skills to produce our prototype.

## What we learned
We learned a variety of things during this project. Firstly and most importantly, we learned how to work together with strangers and developed interpersonal skills. Secondly, everyone in our team had a different skill set so understanding each other's strengths and weaknesses was a core part to working together. In terms of technical things everyone in our group learned different things, such as JavaScript, HTML, CSS and more specifically JavaScript Promises, asynchronous requests and organizing data. 

## What's next for Robo-Summ
As this was a very time limited project, there are still many more features that can be added to enhance usability, such as:
Convert transcription into word doc, markup or pdf. 
Convert transcription into different languages.
Add combo box to allow user to select type of audio/video (Lecture, Meeting, etc.)
Let the user enter keywords like their name to specifically check for.
Upload a video from a local computer.
Besides adding new features and making the code more efficient, we plan to take the next step with this project and create our own backend technology that transcribes audio and video files using Machine Learning. After creating the same product without using an API and having complete control over the code we may create a startup where we create our own in house API and make a fully functioning Audio/Video transcriber that everyone can use. 

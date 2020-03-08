<!--- Make sure to update this training data file with more training examples from https://forum.rasa.com/t/rasa-starter-pack/704 --> 

## intent:goodbye <!--- The label of the intent --> 
- Bye 			<!--- Training examples for intent 'bye'--> 
- Goodbye
- See you later
- Bye bot
- Goodbye friend
- bye
- bye for now
- catch you later
- gotta go
- See you
- goodnight
- have a nice day
- i'm off
- see you later alligator
- we'll speak soon

## intent:greet
- Hi
- Hey
- Hi bot
- Hey bot
- Hello
- Good morning
- hi again
- hi folks
- hi Mister
- hi pal!
- hi there
- greetings
- hello everybody
- hello is anybody there
- hello robot

## intent:thanks
- Thanks
- Thank you
- Thank you so much
- Thanks bot
- Thanks for that
- cheers
- cheers bro
- ok thanks!
- perfect thank you
- thanks a bunch for everything
- thanks for the help
- thanks a lot
- amazing, thanks
- cool, thanks
- cool thank you

## intent:name
- My name is [Juste](name)  <!--- Square brackets contain the value of entity while the text in parentheses is a a label of the entity --> 
- I am [Josh](name)
- I'm [Lucy](name)
- People call me [Greg](name)
- It's [David](name)
- Usually people call me [Amy](name)
- My name is [John](name)
- You can call me [Sam](name)
- Please call me [Linda](name)
- Name name is [Tom](name)
- I am [Richard](name)
- I'm [Tracy](name)
- Call me [Sally](name)
- I am [Philipp](name)
- I am [Charlie](name)
- I am [Kelin](name)
- I am [Peter Parker](name)

## intent:mood_affirm
- yes
- indeed
- of course
- that sounds good
- correct
- yes sure
- absolutely
- for sure
- yes yes yes
- definitely

## intent:mood_deny
- no
- never
- I don't think so
- don't like that
- no way

## intent:mood_great
- perfect
- very good
- great
- amazing
- feeling like a king
- wonderful
- I am feeling very good
- I am great
- I am amazing
- I am going to save the world
- super
- extremely good
- so so perfect
- so good
- so perfect

## intent:mood_unhappy
- my day was horrible
- I am sad
- I don't feel very well
- I am disappointed
- super sad
- I'm so sad
- sad
- very sad
- unhappy
- not so good
- not very good
- extremly sad
- so sad

## intent:NTU
- Where is NTU?
- What is location of NTU?
- What is NTU address?
- What is NTU postal code?

## intent:years
- how long does it take for part-time?
- what is the duration for part-time?
- how long time needed for part-time?
- when can graduate from part-time?

## intent:certificate
- how about certification?
- what is different from certificate of part-time degree and full-time degree?
- is the certification same as full-time?
- what is different from part-time degree and full-time degree?

## intent:qualified
- what is part-time degree requirement?
- who can apply part-time programmes?
- which kind of students can be enrolled for part-time programmes?
- how about part-time degree admission requirement?

## intent:bus
- how to go to NTU?
- which bus can get to NTU?
- how many bus can go to NTU?
- how many ways can get to NTU?

## intent: location_search
- where can I find [clinic](location)?
- where is [NTU](location)?
- what is location of [EEE](location)? 

## synonym:certificate
- cert
- certification
- degree cert

## synonym:qualified
- qualification
- requirement
- require need

## synonym:undergraduate
- degree
- bachelor
- bachelor degree
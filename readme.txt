CPSC 335 Aswilanga Caverns
Class Number 335-04 Project 2 John Scales CWID: 888865730 Team Name: JES Members of Team: John Scales
This program demonstrates a search algorithm that, starting from an extremal cave subsystem, finds the center most subsystem. 
What the program does:
The program starts at an extremal cave room/subsystem and finds a path to the center most cave subsytem.
The algorithm must determine eligible subsystems using 4 rules:
1. ID Limit Rule, which limits the maximum value for each of its three ID parts.  For example, the 
ID Limit Rule for the Puce Caves is 16, 8, and 4.  There is, for example, no room ID of (8, 3, 5) in the 
Puce Caves because in this room ID the third ID part, 5, would be bigger than the third ID limit, 4.  
(The Puce Caves only connect a few rooms, and hence are rather dull.)
2. Sum Rule, states that causeways have the property that the room ID you leave from has the 
same three part ID sum as the room you arrive at.  If you were in room (6, 7, 9), its sum is 22 = 6+7+9. 
Any causeway leaving this room leads to another room whose ID (A, B, C) has a sum of 22 = A+B+C. 
(Note that this is independent of the causeway's color.  The color governs the ID Limits.)
3. Single-Same Rule states that the arrival room shares exactly one unchanged ID part with the 
leaving room; the ID name values of the two rooms differ in exactly two of their ID parts.  Which of 
the three ID parts remains unchanged depends on which causeway you take.  For example, if you were 
in room (6, 8, 2) then you might be able to take a causeway to room (6, 3, 7), which only changed 
exactly two ID parts -- as long as this obeyed the other rules.
4. Zero-Max Rule states that of the two changed room ID parts, in the arrival room either one part
is at its limit (it is Maxed out) or is zero.  So, if you really did move from  room (6, 8, 2) to (6, 3, 7), 
then we could deduce that the third ID name part must have an ID Limit of 7 since no ID part was zero,
the first ID part was unchanged, and the second ID part was reduced.  Alternatively, if the colored 
Caves subsystem you were in had a first part ID Limit Rule of 15, then you could have instead moved 
from (6, 8, 2) to (14, 0, 2); which leaves the third part, 2, unchanged and all of the second part ID value
is zeroed, but the Sum Rule still holds 16 = 6+8+2 = 14+0+2, and so does the Single-Same Rule.  But 
in this example, notice that would be no causeway from cave (14, 0, 2) to (6, 8, 2) unless the Caves 
subsystem Limit Rule had a second ID part limit of 8.
To run the program:
No installation is necessary. Simply open aswilanga.html in a browser to run the program.
No external requirement besides a browser
No extra features & no missing features
There is one bug where it "searches" F00 a second time even though I have it check to make sure it doesn't recheck rooms.
It doesn't affect the path that's drawn on the screen.
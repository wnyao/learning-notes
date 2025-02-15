SELECT p.Name, s.Sport, s.Score AS "Total Score" 
FROM players p INNER JOIN scores s 
ON p.Player_no = s.Player_no; 

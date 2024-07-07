package com.project.doodle.controller;

import com.project.doodle.dto.game.StartGameRequestDTO;
import com.project.doodle.dto.game.StartTurnRequestDTO;
import com.project.doodle.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"https://doodlefrontend.vercel.app", "http://localhost:5173"})
@RequestMapping("/game")
public class GameController {
    @Autowired
    GameService gameService;

    @PostMapping("/start")
    public void startGame(@RequestBody StartGameRequestDTO request){
        gameService.startGame(request);
    }

    @PostMapping("/turn/start")
    public void startTurn(@RequestBody StartTurnRequestDTO request){
        gameService.startTurn(request);
    }
    @GetMapping("/turn/end/{roomId}")
    public void endTurn(@PathVariable long roomId){
        gameService.stopTurn(roomId);
    }
}

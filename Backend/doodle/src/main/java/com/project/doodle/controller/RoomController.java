package com.project.doodle.controller;

import com.project.doodle.dto.room.CreateRoomRequestDTO;
import com.project.doodle.dto.room.CreateRoomResponseDTO;
import com.project.doodle.dto.room.JoinRoomDTO;
import com.project.doodle.service.RoomService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/room")
@CrossOrigin(origins = {"https://doodlefrontend.vercel.app", "http://localhost:5173"})
public class RoomController {
    @Autowired
    RoomService roomService;

    @Autowired
    WebSocketMessageController wsController;

    @PostMapping("/")
    public ResponseEntity<?> createRoom(@Valid @RequestBody CreateRoomRequestDTO request)  {
        

        CreateRoomResponseDTO createRoomResponseDTO = roomService.createRoom(request);
        Map<String, Object> map = new HashMap<>();
        map.put("status", 1);
        map.put("message", "Success.");
        map.put("data", createRoomResponseDTO);
        return new ResponseEntity<>(map, HttpStatusCode.valueOf(200));
    }

    @PostMapping("/join")
    public ResponseEntity<?> joinRoom(@Valid @RequestBody JoinRoomDTO request) {
        
        CreateRoomResponseDTO createRoomResponseDTO = roomService.joinRoom(request);
        Map<String, Object> map = new HashMap<>();
        map.put("status", 1);
        map.put("message", "Success.");
        map.put("data", createRoomResponseDTO);
        return new ResponseEntity<>(map, HttpStatusCode.valueOf(200));
    }

    @DeleteMapping("/leave")
    public ResponseEntity<?> leaveRoom(@RequestParam("player") int playerId, @RequestParam("room") long roomId)  {
        int newOwner = roomService.leaveRoom(roomId, playerId);
        Map<String, Integer> request = new HashMap<>();
        request.put("playerId", playerId);
        request.put("newOwner", newOwner);
        wsController.removePlayer(roomId, request);
        Map<String, Object> map = new HashMap<>();
        map.put("status", 1);
        map.put("message", "Left room successfully.");
        return new ResponseEntity<>(map, HttpStatusCode.valueOf(200));
    }


}

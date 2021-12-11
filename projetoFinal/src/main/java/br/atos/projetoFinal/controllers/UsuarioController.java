package br.atos.projetoFinal.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.atos.projetoFinal.models.Usuario;
import br.atos.projetoFinal.repository.UsuarioRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins="http://localhost:4200")
@Api(tags = "Usuarios")
@RestController
@RequestMapping("/usuario")
public class UsuarioController {

	@Autowired
	UsuarioRepository usuarioRepository;

	BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

	@ApiOperation(value = "Retorna lista de usuarios cadastrados", response = Iterable.class, tags = "Usuarios")
	@GetMapping
	public ResponseEntity<List<Usuario>> getAll() {
		try {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(usuarioRepository.findAll());
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	@ApiOperation(value = "filtrar usuário no banco pelo nome", response = Iterable.class, tags = "Usuarios")
	@GetMapping("/login")
	public ResponseEntity<Usuario> loginUsuario(@RequestParam String nome){
		try {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(usuarioRepository.findByNome(nome));
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	@ApiOperation(value = "Cria um novo usuário no banco", response = Iterable.class, tags = "Usuarios")
	@PostMapping
	public ResponseEntity<Usuario> createUsuario(@RequestBody Usuario usuario) {
		try {
			usuario.setSenha(encoder.encode(usuario.getPassword())); //encriptando senha do usuario
			return ResponseEntity.status(HttpStatus.CREATED).body(usuarioRepository.save(usuario));
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
	
	@ApiOperation(value = "Atualiza um usuario que está cadastrado no banco de dados via ID", response = Iterable.class, tags = "Usuarios")
	@PutMapping("/{id}")
	public ResponseEntity<Usuario> updateUsuario(@RequestBody Usuario usuario, @PathVariable Long id) {
		try {
			Usuario newUsuario = usuarioRepository.getById(id);
			newUsuario.setNome(usuario.getNome());
			newUsuario.setSenha(encoder.encode(usuario.getPassword()));
			return ResponseEntity.status(HttpStatus.OK).body(usuarioRepository.save(newUsuario));
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	
	}

	@ApiOperation(value = "Deleta um usuario do banco via id", response = Iterable.class, tags = "Usuarios")
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public String deletarUsuario(@PathVariable Long id) {
		try {
			usuarioRepository.deleteById(id);
			return "Usuário excluído com suvesso";
		}catch(Exception e) {
			return "Usuário não encontrado!";
		}
	}
	
}

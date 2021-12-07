package br.atos.projetoFinal.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.atos.projetoFinal.models.Endereco;
import br.atos.projetoFinal.models.Produto;
import br.atos.projetoFinal.repository.EnderecoRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(tags = "Endereco")
@RestController
@RequestMapping("/endereco")
public class EnderecoController {

	@Autowired
	EnderecoRepository enderecoRepository;
	
	@ApiOperation(value = "Retorna todos os Endereços", response = Iterable.class, tags = "endereços")
	@GetMapping
	public ResponseEntity<List<Endereco>> getAll() {
		try {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(enderecoRepository.findAll());
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	@ApiOperation(value = "Retorna os Endereços por id vindo do @PathVariable ", response = Iterable.class, tags = "endereços")	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<Endereco>> getEnderecoId(@PathVariable Long id) {
		try {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(enderecoRepository.findById(id));
			
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}
	
	@ApiOperation(value = "Cria um Endereço por @RequestBOdy ", response = Iterable.class, tags = "endereços")
	@PostMapping
	public ResponseEntity<Endereco> create(@RequestBody Endereco endereco) {
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(enderecoRepository.save(endereco));
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Endereco> updateProduto(@RequestBody Endereco endereco, @PathVariable Long id) {
		try {
			Endereco newEndereco = enderecoRepository.getById(id);
			newEndereco.setCep(endereco.getBairro());
			newEndereco.setBairro(endereco.getBairro());
			newEndereco.setRua(endereco.getRua());
			newEndereco.setNumero(endereco.getNumero());
			newEndereco.setComplemento(endereco.getComplemento());
			return ResponseEntity.status(HttpStatus.OK).body(enderecoRepository.save(newEndereco));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}
	
	@ApiOperation(value = "Deleta um Endereço por id vindo do @PathVariable ", response = Iterable.class, tags = "endereços")
	@DeleteMapping("/{id}")
	public String deletarEndereco(@PathVariable Long id) {
		try {
			enderecoRepository.deleteById(id);
			return "Deletado com sucesso";
			
		}catch(Exception e) {
			return "Não foi possicel encontrar o ID";
		}
	}
	
}

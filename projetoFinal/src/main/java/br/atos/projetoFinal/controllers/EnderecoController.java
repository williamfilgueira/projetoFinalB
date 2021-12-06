package br.atos.projetoFinal.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.atos.projetoFinal.models.Endereco;
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
	public List<Endereco> getAll() {
		return enderecoRepository.findAll();
	}

	@ApiOperation(value = "Retorna os Endereços por id vindo do @PathVariable ", response = Iterable.class, tags = "endereços")	
	@GetMapping("/{id}")
	public Optional<Endereco> getEnderecoId(@PathVariable Long id) {
		return enderecoRepository.findById(id);
	}
	
	@ApiOperation(value = "Cria um Endereço por @RequestBOdy ", response = Iterable.class, tags = "endereços")
	@PostMapping
	public Endereco create(@RequestBody Endereco endereco) {
		try {
			return enderecoRepository.save(endereco);
		}catch (Exception e) {
			System.out.println(e);
			return null;
		}
	}
	@ApiOperation(value = "Deleta um Endereço por id vindo do @PathVariable ", response = Iterable.class, tags = "endereços")
	@DeleteMapping("/{id}")
	public void deletarEndereco(@PathVariable Long id) {
		System.out.println("id");
		enderecoRepository.deleteById(id);
	}
	
}

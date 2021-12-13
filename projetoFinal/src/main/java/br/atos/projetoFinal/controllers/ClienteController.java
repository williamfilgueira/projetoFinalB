package br.atos.projetoFinal.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.atos.projetoFinal.models.Cliente;
import br.atos.projetoFinal.repository.ClienteRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins="http://localhost:4200")
@Api(tags = "Clientes")
@RestController
@RequestMapping("/clientes")
public class ClienteController {

	@Autowired
	ClienteRepository clienteRepository;

	@ApiOperation(value = "Retorna lista de todos clientes cadastrados", response = Iterable.class, tags = "Clientes")
	@GetMapping
	public ResponseEntity<List<Cliente>> getAll() {
		try {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(clienteRepository.findAll());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	@ApiOperation(value = "Retorna um cliente, passado pelo {id} vindo do @PathVariable", response = Iterable.class, tags = "Clientes")
	@GetMapping("/{id}")
	public ResponseEntity<Optional<Cliente>> getClienteId(@PathVariable Long id) {
		try {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(clienteRepository.findById(id));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	@ApiOperation(value = "Criar um cliente e salvar no banco, passando valores pelo @RequestBody", response = Iterable.class, tags = "Clientes")
	@PostMapping
	public ResponseEntity<Cliente> create(@RequestBody Cliente cliente) {
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(clienteRepository.save(cliente));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}

	@ApiOperation(value = "Atualiza um cliente de acodordo com o {id} vindo do @PathVariable", response = Iterable.class, tags = "Clientes")
	@PutMapping("/{id}")
	public ResponseEntity<Cliente> updateCliente(@RequestBody Cliente cliente, @PathVariable Long id) {
		try {
			Cliente newCliente = clienteRepository.getById(id);
			newCliente.setNome(cliente.getNome());
			newCliente.setCpf(cliente.getCpf());
			return ResponseEntity.status(HttpStatus.OK).body(clienteRepository.save(newCliente));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	@ApiOperation(value = "Deleta um cliente, passado pelo {id} vindo do @PathVariable", response = Iterable.class, tags = "Clientes")
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public void deletarCliente(@PathVariable Long id) {
		try {
			clienteRepository.deleteById(id);
			System.out.println("Deletado com sucesso!!");
			
		} catch (Exception e) {
			System.out.println("Cliente não deletado");
		}
	}

}

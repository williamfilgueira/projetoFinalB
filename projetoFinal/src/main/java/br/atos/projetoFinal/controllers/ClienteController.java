package br.atos.projetoFinal.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.atos.projetoFinal.models.Cliente;
import br.atos.projetoFinal.repository.ClienteRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(tags = "Clientes")
@RestController
@RequestMapping("/clientes")
public class ClienteController {

	@Autowired
	ClienteRepository clienteRepository;

	@ApiOperation(value = "Retorna lista de todos clientes cadastrados", response = Iterable.class, tags = "Clientes")
	@GetMapping
	public List<Cliente> getAll() {
		return clienteRepository.findAll();
	}

	@ApiOperation(value = "Retorna um cliente, passado pelo {id} vindo do @PathVariable", response = Iterable.class, tags = "Clientes")
	@GetMapping("/{id}")
	public Optional<Cliente> getClienteId(@PathVariable Long id) {
		return clienteRepository.findById(id);
	}

	@ApiOperation(value = "Criar um cliente e salvo no banco, passando valores pelo @RequestBody", response = Iterable.class, tags = "Clientes")
	@PostMapping
	public Cliente create(@RequestBody Cliente cliente) {
		return clienteRepository.save(cliente);
	}

	@ApiOperation(value = "Atualiza um cliente de acodordo com o {id} vindo do @PathVariable", response = Iterable.class, tags = "Clientes")
	@PutMapping("/{id}")
	public Cliente updateCliente(@RequestBody Cliente cliente, @PathVariable Long id) {
		Cliente newCliente = clienteRepository.getById(id);
		newCliente.setNome(cliente.getNome());
		newCliente.setCpf(cliente.getCpf());
		return clienteRepository.save(newCliente);
	}

	@ApiOperation(value = "Deleta um cliente, passado pelo {id} vindo do @PathVariable", response = Iterable.class, tags = "Clientes")
	@DeleteMapping("/{id}")
	public void deletarCliente(@PathVariable Long id) {
		System.out.println("id");
		clienteRepository.deleteById(id);
	}

}

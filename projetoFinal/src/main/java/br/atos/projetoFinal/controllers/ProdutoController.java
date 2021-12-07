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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.atos.projetoFinal.models.Produto;
import br.atos.projetoFinal.repository.ProdutoRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(tags = "Produtos")
@RestController
@RequestMapping("/produtos")
public class ProdutoController {

	@Autowired
	ProdutoRepository produtoRepository;

	@ApiOperation(value = "Retorna lista de todos clientes cadastrados", response = Iterable.class, tags = "Produto")
	@GetMapping
	public ResponseEntity<List<Produto>> getAll() {
		try {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(produtoRepository.findAll());
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	@ApiOperation(value = "Retorna clientes por id vindo do @PathVariable cadastrados", response = Iterable.class, tags = "Produto")
	@GetMapping("/{id}")
	public ResponseEntity<Optional<Produto>> getProdutoId(@PathVariable Long id) {
		try {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body( produtoRepository.findById(id));
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	@ApiOperation(value = "Cria clientes vindo do @RquestBody cadastrados", response = Iterable.class, tags = "Produto")
	@PostMapping
	public ResponseEntity<Produto> create(@RequestBody Produto produto) {
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(produtoRepository.save(produto));
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}

	@ApiOperation(value = "atualiza cliente por id vindo do do @RequestBody e @PathVariable cadastrados", response = Iterable.class, tags = "Produto")
	@PutMapping("/{id}")
	public ResponseEntity<Produto> updateProduto(@RequestBody Produto produto, @PathVariable Long id) {
		try {
			Produto newProduto = produtoRepository.getById(id);
			newProduto.setNome(produto.getNome());
			newProduto.setValor(produto.getValor());
			return ResponseEntity.status(HttpStatus.OK).body(produtoRepository.save(newProduto));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	@ApiOperation(value = "Deleta clientes por id vindo do @PathVariable cadastrados", response = Iterable.class, tags = "Produto")
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public String deletarProduto(@PathVariable Long id) {
		try {
			produtoRepository.deleteById(id);
			System.out.println("id");
			return "Deletado com sucesso";

		} catch (Exception e) {
			return "Não foi possicel encontrar o ID";
		}
	}

}

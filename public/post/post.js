document.querySelector('#cadastro').addEventListener('submit',async e=>{
 e.preventDefault();const button=e.target.querySelector('button');button.disabled=true;
 try {const p=await api('/pessoas','POST',dadosFormulario(e.target));e.target.reset();mensagem(`Cadastro ${p.id} criado com sucesso. Acesse Consultar para visualizá-lo.`);} catch(err){mensagem(err.message,true);} finally{button.disabled=false;}
});

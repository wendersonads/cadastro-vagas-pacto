<h1>Cadastro de Vagas</h1>
<h4>Resquisitos BACK-END</h4>
<ul>
<li><b>JAVA: </b> Para executar a API desenvolvida em SpringBoot é necessário ter instalada no computador versão do java 17 ou superior.</li>
<li><b>PORTA: </b> Foi definido no arquivo de configuração <strong>application.properties</strong> a porta de execução da API sendo 8081, sendo obrigatório rodar nessa porta devido o front-end estar configurado para fazer requisições montando a URL usando essa porta.</li>
</ul>
<h4>Resquisitos FRONT-END</h4>
<ul>
<li><b>NODE: </b> Para executar o Front desenvolvido em Angular é necessário ter instalada no computador versão do Node.js 16.x ou superior.</li>
<li><b>PORTA: </b> Por padrão o Angular usa a porta 4200 para rodar a aplicação, caso a porta esteja em uso no seu computador pode-se rodar em outra porta especificando no comando ng serve --port "número da porta" ao iniciar a aplicação.</li>
</ul>
<h2>Executando a aplicação</h2>
<p> Baixe os arquivos usando o comando git clone https://github.com/wendersonads/cadastro-vagas-pacto.git ou baixando diretamente o arquivo ZIP disponível no repositório.</p>
<h4>BACK-END</h4>
<ul>
<li> Para executar a API abra a pasta Back-End em qualquer IDE com suporte  para executar JAVA/SPRINGBOOT ou editor de texto como VISUAL STUDIO CODE e execute a aplicação. <b>OBS: Banco de dados POSTGRESQL está sendo executado em uma VPS não havendo necessidade de configurar localmente, sendo assim as configurações estão sendo aplicadas no arquivo de configuração application.properties</b>
</ul>
<h4>FRONT-END</h4>
<ul>
<li> Para executar o FRONT abra a pasta Front-End em qualquer editor de texto como VISUAL STUDIO CODE ou qualquer um de preferência, execute o comando <b>npm install --force</b> e em seguida <b>ng serve</b> <b>ou ng serve --port "numero da porta"</b> caso a porta 4200 esteja em uso. <b> OBS: O comando deve ser npm install --force devido o projeto estar dando conflito entre versões das dependências</b>
</ul>
<h2>Explicando o Sistema</h2>
<p>O Sistema foi desenvolvido para dois perfis de acesso sendo <b> 1-Admnistrador e 2-Candidato</b></p>
<ul>
<li><b>Perfil Administrador: </b> O perfil de administrador é o perfil de acesso configurado para o usuário cadastrar novas vagas e visualizar os candidatos que se candidataram as vagas, <b>Para o acesso use USUÁRIO: Admin e SENHA: admin</b></li>
<p>EXEMPLO: </p>
<div>
    <img src="images/cadastroVaga.png" alt="" />
</div>
<div>
    <img src="images/candidatosVagas.png" alt="" />
</div>
<li><b>Perfil Candidato: </b> O perfil de candidato é o perfil de acesso configurado para o usuário se candidatar a novas vagas e visualizar as vagas na qual candidatou-se <b>Para o acesso crie um novo cadastro, novos cadastros já estão configurados para receber o perfil de candidato</b></li>
<p>EXEMPLO: </p>
<div>
    <img src="images/candidaturaVaga.png" alt="" />
</div>
<div>
    <img src="images/minhasVagas.png" alt="" />
</div>
</ul>












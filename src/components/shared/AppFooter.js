/* eslint-disable react/prop-types */
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebookSquare,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons"
import { faComment } from "@fortawesome/free-solid-svg-icons"
import { Container } from "components/ui"

const Footer = ({ children }) => (
  <footer className="text-white text-sm bg-gray-800 py-6 mt-8">
    {children}
  </footer>
)

const Link = ({ className, children, ...props }) => (
  <a
    className={`text-white block last:mb-0 hover:text-blue-400 ${className}`}
    {...props}
  >
    {children}
  </a>
)

const ExternalLink = ({ className, children, ...props }) => (
  <a
    className={`text-white block mb-2 last:mb-0 hover:text-blue-400 ${className}`}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    {children}
  </a>
)

const AppFooter = () => (
  <Footer>
    <Container>
      <h1 className="text-3xl text-center mb-6">Fale conosco</h1>

      <div className="flex flex-wrap items-stretch -mx-3">
        <div className="w-full md:w-1/3 lg:w-1/5 px-3">
          <strong>Reitoria</strong>
          <p>Av. Fernando Machado, 108 E</p>
          <p>Centro, Chapecó, SC - Brasil</p>
          <p>Caixa Postal 181 - CEP 89802-112</p>
          <Link href="tel:4920493100">Telefone: (49) 2049-3100</Link>
          <p>CNPJ 11.234.780/0001-50</p>
          <br/>
        </div>

        <div className="w-full md:w-1/3 lg:w-2/5 px-3">
          <div className="flex flex-wrap items-stretch -mx-3">
            <div className="w-full lg:w-1/2 px-3">
              <strong>Campus Cerro Largo-RS</strong>
              <p>Rua Jacob Reinaldo Haupenthal, 1.580,</p>
              <p>São Pedro, CEP 97900-000</p>
              <Link href="tel:5533593950">Telefone: (55) 3359-3950</Link>
              <br/>

              <strong>Campus Chapecó-SC</strong>
              <p>Rodovia SC 484 - Km 02, Fronteira Sul,</p>
              <p>CEP 89815-899</p>
              <p>Telefone: (49) 2049-2600</p>
              <br/>

              <strong>Campus Erechim-RS</strong>
              <p>ERS 135 - Km 72, 200, Cx Postal 764,</p>
              <p>CEP 99700-970</p>
              <p>Telefone: (54) 3321-7050</p>
              <br/>
            </div>

            <div className="w-full lg:w-1/2 px-3">
              <strong>Campus Laranjeiras do Sul-PR</strong>
              <p>Rodovia BR 158 - Km 405</p>
              <p>CEP 85301-970</p>
              <p>Telefone: (42) 3635-0000</p>
              <br/>

              <strong>Campus Passo Fundo-RS</strong>
              <p>Rua Capitão Araújo, 20, Centro,</p>
              <p>Cx Postal 3520, CEP 99010-200</p>
              <p>Telefone: (54) 3335-8515</p>
              <br/>

              <strong>Campus Realeza-PR</strong>
              <p>Rodovia BR 182 - Km 466</p>
              <p>Avenida Edmundo Gaievski, 1000</p>
              <p>Cx Postal 253, CEP 85770-000</p>
              <p>Telefone: (46) 3543-8300</p>
              <br/>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 lg:w-2/5 px-3">
          <div className="flex flex-wrap items-stretch -mx-3">
            <div className="w-full lg:w-1/2 px-3">
              <ExternalLink href="https://twitter.com/uffsonline">
                <FontAwesomeIcon icon={faTwitter}/>
                <span className="ml-1">@uffsonline</span>
              </ExternalLink>

              <ExternalLink href="https://www.facebook.com/uffsonline">
                <FontAwesomeIcon icon={faFacebookSquare}/>
                <span className="ml-1">uffsonline</span>
              </ExternalLink>

              <ExternalLink href="https://www.instagram.com/escolhiseruffs/">
                <FontAwesomeIcon icon={faInstagram}/>
                <span className="ml-1">@escolhiseruffs</span>
              </ExternalLink>

              <ExternalLink
                href="https://www.uffs.edu.br/acessofacil/transparencia/servico-de-informacao-ao-cidadao-e-sic/e-sic">
                <FontAwesomeIcon icon={faComment}/>
                <span className="ml-1">Acesso à informação</span>
              </ExternalLink>
              <br/>
            </div>

            <div className="w-full lg:w-1/2 px-3">
              <ExternalLink href="http://uffs.edu.br">
                Site UFFS
              </ExternalLink>

              <ExternalLink
                href="https://www.uffs.edu.br/institucional/reitoria/ouvidoria/apresentacao"
              >
                Ouvidoria
              </ExternalLink>

              <ExternalLink
                href="https://www.uffs.edu.br/acessofacil/imprensa/sala-de-imprensa"
              >
                Sala de imprensa
              </ExternalLink>

              <ExternalLink href="https://telefones.uffs.edu.br">
                Lista telefônica UFFS
              </ExternalLink>

              <ExternalLink href="https://dados.uffs.edu.br">
                Dados abertos
              </ExternalLink>

              <Link className="mb-2" href="mailto:contato@uffs.edu.br">contato@uffs.edu.br</Link>
            </div>
          </div>
        </div>

      </div>
    </Container>
  </Footer>
)

export default AppFooter

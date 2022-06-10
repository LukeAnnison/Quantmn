import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

export const useWeb3Modal = async () => {
  const [web3Modal, setWeb3Modal] = useState(null)
  const [signer, setSigner] = useState(null)

  useEffect(() => {
    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
      providerOptions: {}
    })
    setWeb3Modal(web3Modal)
  }, [])

  const connectWallet = async () => {
    const instance = await web3Modal.connect()
    const providers = new ethers.providers.Web3Provider(instance)
    const signer = providers.getSigner()
    setSigner(signer)
  }

  return { connectWallet, signer }
}

<div className="grid justify-center">
            {campaign.endAt <= new Date().getTime() / 1000 &&
            account === campaign.owner ? (
              <>
                <p className="font-bold text-red-400">Campaign Has Ended</p>
                <p>If you are the owner, connect your wallet to withdraw</p>
                <>
                  <button
                    className="border border-black rounded-md px-4 py-2 hover:bg-teal-700 hover:text-white"
                    onClick={withdrawFunds}
                  >
                    Withdraw
                  </button>
                  {withdrawHash ? (
                    <a
                      href={`https://goerli.etherscan.io/tx/${withdrawHash}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-thin text-teal-900 hover:underline "
                    >
                      Withdrawing funds...
                    </a>
                  ) : (
                    <></>
                  )}
                </>
              </>
            ) : (
              <div className="flex flex-row space-x-5">
                {!agree ? (
                  <div className="grid justify-center space-y-2">
                    <p className="text-left xs:text-md md:text-lg font-bold">
                      Connect Wallet To Interact
                    </p>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="agree"
                        onChange={checkboxHandler}
                        value=""
                        className="w-4 h-4 text-blue-600 rounded focus:bg-gray-800  focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-white border-gray-600"
                      />
                      <label
                        htmlFor="link-checkbox"
                        className="ml-2 text-xs font-medium text-gray-400"
                      >
                        I agree with the{" "}
                        <NavLink to="/terms">
                          <span className="text-blue-600 dark:text-blue-500 hover:underline">
                            terms and conditions
                          </span>
                        </NavLink>
                        .
                      </label>
                    </div>
                  </div>
                ) : (
                  <div>
                    {account ? (
                      <div className="grid justify-center">
                        <div>
                          {account !== campaign.owner &&
                          campaign.endAt = new Date().getTime() / 1000 ? (
                            <div className="flex flex-row space-x-4 justify-between">
                              <input
                                placeholder="In ETH"
                                id="eth"
                                className="bg-gray-50 w-20 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-2.5  dark:placeholder-gray-400  dark:focus:ring-teal-500 dark:focus:border-teal-500"
                              />
                              <button
                                onClick={pledgeToCampaign}
                                className="border border-black px-4 h-11 xs:text-xs md:text-md lg:text-lg bg-transparent hover:bg-teal-700 hover:text-white rounded-md"
                              >
                                Pledge
                              </button>
                            </div>
                          ) : (
                            <div>
                              {account == campaign.owner &&
                              campaign.startAt >=
                                new Date().getTime() / 1000 ? (
                                <div className="w-full grid justify-center space-y-2 text-xs text-center">
                                  <p>
                                    The campaign hasn't started yet. Do you want
                                    to cancel?
                                  </p>
                                  <button
                                    className="border border-black rounded-md px-4 py-2 hover:bg-teal-700 hover:text-white"
                                    onClick={cancelCampaigns}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <div className="w-full grid justify-center space-y-2 text-xs text-center">
                                  <p>Campaign Hasn't Started Yet</p>
                                </div>
                              )}
                              {cancelHash ? (
                                <a
                                  href={`https://goerli.etherscan.io/tx/${cancelHash}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="font-thin text-teal-900 hover:underline "
                                >
                                  Cancelling campaign...
                                </a>
                              ) : (
                                <></>
                              )}
                            </div>
                          )}
                        </div>
                        {txHash ? (
                          <p className="font-xs font-bold text-teal-600 pt-2 grid justify-center">
                            Sending your pledge...{" "}
                            <a
                              href={`https://goerli.etherscan.io/tx/${txHash}`}
                              target="_blank"
                              rel="noreferrer"
                              className="font-thin text-teal-900 hover:underline "
                            >
                              <span className="font-bold">TX:</span>{" "}
                              {txHash.substring(0, 6)}...{" "}
                              {txHash.substring(txHash.length - 6)}
                            </a>
                          </p>
                        ) : (
                          <>
                            <p className="font-xs font-bold text-teal-600 pt-2">
                              Connected:{" "}
                              <span className="font-thin text-teal-900">
                                {account.substring(0, 4)}...
                                {account.substring(account.length - 4)}
                              </span>
                            </p>

                            {errMsg ? (
                              <p className="text-red-600">{errMsg}</p>
                            ) : (
                              <></>
                            )}
                          </>
                        )}
                      </div>
                    ) : (
                      <MMButton
                        agree={agree}
                        connectWallet={connectWallet}
                        owner={account}
                      />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
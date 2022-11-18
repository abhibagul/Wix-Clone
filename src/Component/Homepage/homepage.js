import React from 'react'
import { Link } from 'react-router-dom'
export default function Homepage() {
    let css = `html,body{border: 0;padding: 0;margin: 0;outline: 0;}
    .bld_0_{max-width:calc(100% - 0px);margin:0px 0px;padding:0px;position:static;top:nullpx;background-color:rgba(255,255, 255, 1);background-image:none;background-size:initial;background-position:initial;background-repeat:initial;}
    .bld_0_0_{padding:5px;min-height:48.26041793823242px;background-color:rgba(255,255, 255, 1);background-image:none;background-size:initial;background-position:initial;background-repeat:initial;}
    .bld_0_0_0_{max-width:1100px;margin:0 auto;padding:0px;}
    .bld_0_0_0_0_{padding:5px;min-height:43.27777862548828px;align-items:flex-start;justify-content:center;}
    .bld_0_0_0_0_0_{color:#0d6efd;font-family:Montserrat;font-size:1em;font-weight:800;text-align:left;text-transform:uppercase;letter-spacing:3.3px;line-height:1.2em;}
    .bld_0_0_0_1_{padding:5px;align-items:flex-start;justify-content:flex-start;}
    .bld_0_0_0_1_0_{position:relative;}
    .bld_0_0_0_1_0_0_{padding:5px;}
    .bld_0_0_0_1_0_0_0_{padding:5px;}
    .bld_0_0_0_1_0_0_0_0_{color:#000000;padding:5px;text-decoration:none;font-family:Montserrat;font-size:0.9em;font-weight:500;}
    .bld_0_0_0_1_0_0_1_{padding:5px;}
    .bld_0_0_0_1_0_0_1_0_{color:#6b6b6b;padding:5px;text-decoration:none;font-family:Montserrat;font-size:0.9em;font-weight:500;}
    .bld_0_0_0_2_{padding:5px;align-items:flex-end;justify-content:center;}
    .bld_0_0_0_2_0_{position:relative;}
    .bld_0_0_0_2_0_0_{padding:5px;}
    .bld_0_0_0_2_0_0_0_{padding:5px;}
    .bld_0_0_0_2_0_0_0_0_{color:#000000;padding:5px;text-decoration:none;}
    .bld_0_0_0_2_0_0_1_{padding:5px;}
    .bld_0_0_0_2_0_0_1_0_{color:#ffffff;padding:5px;text-decoration:none;background-color:rgba(13,110, 253, 1);background-image:none;background-size:initial;background-position:initial;background-repeat:initial;padding-top:5px;padding-left:15px;padding-bottom:5px;padding-right:15px;font-family:Montserrat;font-size:1em;font-weight:500;text-align:left;text-transform:none;letter-spacing:1px;line-height:1.2em;border-radius:50px;}
    .bld_1_{max-width:calc(100% - 0px);margin:0px 0px;padding:0px;background-image:none;background-size:initial;background-position:initial;background-repeat:initial;background-attachment:initial;min-height:-26.761573791503906px;background-color:rgba(255,255, 255, 0);}
    .bld_1_0_{padding:5px;min-height:45.238426208496094px;padding-top:5px;padding-left:5px;padding-bottom:5px;padding-right:5px;background-color:rgba(0,63, 158, 1);background-image:none;background-size:initial;background-position:initial;background-repeat:initial;}
    .bld_1_0_0_{max-width:1100px;margin:0 auto;padding:5px;}
    .bld_1_0_0_0_{padding:5px;min-height:-15.744209289550781px;align-items:center;justify-content:center;}
    .bld_1_0_0_0_0_{color:#ffffff;font-family:Montserrat;font-size:1.1em;font-weight:300;text-align:left;text-transform:capitalize;letter-spacing:2.4px;line-height:1.2em;}
    .bld_2_{max-width:calc(100% - 0px);margin:0px 0px;padding:0px;background-image:none;background-size:initial;background-position:initial;background-repeat:initial;background-attachment:initial;min-height:-26.761573791503906px;background-color:rgba(255,255, 255, 0);}
    .bld_2_0_{padding:5px;min-height:489.5700225830078px;padding-top:5px;padding-left:5px;padding-bottom:5px;padding-right:5px;background-color:rgba(13,110, 253, 1);background-image:none;background-size:initial;background-position:initial;background-repeat:initial;}
    .bld_2_0_0_{max-width:1100px;margin:0 auto;padding:5px;}
    .bld_2_0_0_0_{padding:5px;min-height:562.2170104980469px;align-items:center;justify-content:center;}
    .bld_2_0_0_0_0_{color:#ffffff;font-family:Montserrat;font-size:4.3em;font-weight:800;text-align:center;text-transform:capitalize;letter-spacing:1px;line-height:1.2em;}
    .bld_2_0_0_0_1_{color:#ffffff;text-align:center;text-transform:capitalize;letter-spacing:1px;line-height:1.9em;padding:50px;font-family:Montserrat;font-size:1em;font-weight:500;}
    .bld_2_0_0_0_2_{background-color:rgba(255,255, 255, 1);display:inline-block;color:#000000;padding:5px 10px;border-radius:10px;box-shadow:3px 3px 5px rgba(0,0,0,.1), -3px -3px 5px rgba(0,0,0,.1);background-image:none;background-size:initial;background-position:initial;background-repeat:initial;font-family:Montserrat;font-size:1em;font-weight:500;padding-top:15px;padding-left:40px;padding-bottom:15px;padding-right:40px;}
    .bld_3_{max-width:calc(100% - 0px);margin:0px 0px;padding:5px;min-height:211.060791015625px;}
    .bld_3_0_{padding:5px;min-height:429.254638671875px;align-items:flex-start;justify-content:center;}
    .bld_3_0_0_{max-width:1100px;margin:0 auto;padding:5px;}
    .bld_3_0_0_0_{padding:5px;align-items:center;justify-content:center;}
    .bld_3_0_0_0_0_{animation-duration:2000ms;animation-delay:0ms;animation-iteration-count:infinite;;}
    .bld_3_0_0_0_0_.animate{animation-name:tada;animation-fill-mode: forwards;}
    .bld_3_0_0_1_{padding:5px;min-height:338.93865966796875px;align-items:stretch;justify-content:center;padding-top:5px;padding-left:25px;padding-bottom:5px;padding-right:25px;}
    .bld_3_0_0_1_0_{color:#000000;}
    .bld_3_0_0_1_1_{color:#000000;}
    .bld_4_{max-width:calc(100% - 0px);margin:0px 0px;padding:5px;min-height:211.060791015625px;}
    .bld_4_0_{padding:5px;min-height:429.254638671875px;align-items:flex-start;justify-content:center;padding-top:5px;padding-left:5px;padding-bottom:50px;padding-right:5px;}
    .bld_4_0_0_{max-width:1100px;margin:0 auto;padding:5px;}
    .bld_4_0_0_0_{padding:5px;min-height:338.93865966796875px;align-items:center;justify-content:center;padding-top:5px;padding-left:25px;padding-bottom:5px;padding-right:25px;}
    .bld_4_0_0_0_0_{}
    .bld_4_0_0_0_1_{color:#000000;text-align:center;text-transform:none;letter-spacing:1px;line-height:1.2em;}
    .bld_4_0_0_0_2_{color:#000000;text-align:center;text-transform:none;letter-spacing:1px;line-height:1.2em;}
    .bld_4_0_0_1_{padding:25px;min-height:338.93865966796875px;align-items:center;justify-content:center;padding-top:5px;padding-left:25px;padding-bottom:5px;padding-right:25px;background-image:linear-gradient(0deg,rgba(250,112, 154, 1) 0%,rgba(254,225, 64, 1) 100%);background-color:rgba(250,112, 154, 1);background-size:initial;background-position:initial;background-repeat:initial;border-radius:10px;border-top:2px solid #bababa;border-left:2px solid #bababa;border-right:2px solid #bababa;border-bottom:2px solid #bababa;box-shadow: 5px 5px 5px rgba(0,0,0,0.1), -6px -4px 5px rgba(0,0,0,0.1);}
    .bld_4_0_0_1_0_{color:#ffffff;text-align:left;text-transform:none;letter-spacing:2.8px;line-height:1.7em;font-family:Montserrat;font-size:2.4em;font-weight:500;}
    .bld_4_0_0_1_1_{color:#000000;text-align:center;text-transform:none;letter-spacing:1px;line-height:1.2em;}
    .bld_4_0_0_2_{padding:5px;min-height:338.93865966796875px;align-items:center;justify-content:center;padding-top:5px;padding-left:25px;padding-bottom:5px;padding-right:25px;}
    .bld_4_0_0_2_0_{color:#000000;text-align:center;text-transform:none;letter-spacing:1px;line-height:1.2em;}
    .bld_4_0_0_2_1_{color:#000000;text-align:center;text-transform:none;letter-spacing:1px;line-height:1.2em;}
    .bld_4_0_0_2_2_{color:#000000;padding:5px;list-style-position:inside;list-style-type:"🦉";}
    .bld_4_0_0_2_2_0_{color:#000000;}
    .bld_4_0_0_2_2_1_{color:#000000;padding:5px;list-style-position:inside;list-style-type:"✅";}
    .bld_4_0_0_2_2_1_0_{color:#000000;}
    .bld_4_0_0_2_2_2_{color:#000000;}
    .bld_4_0_0_2_2_3_{color:#000000;padding:5px;list-style-position:inside;list-style-type:"🐹";}
    .bld_4_0_0_2_2_3_0_{color:#000000;}
    .bld_5_{max-width:calc(100% - 0px);margin:0px 0px;padding:0px;min-height:460.1973571777344px;background-image:url("https://images.pexels.com/photos/7759167/pexels-photo-7759167.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");background-size:cover;background-position:center center;background-repeat:repeat;background-attachment:fixed;}
    .bld_5_0_{padding:5px;min-height:394.05499267578125px;background-color:rgba(0,0, 0, 0.12);background-image:none;background-size:initial;background-position:initial;background-repeat:initial;}
    .bld_5_0_0_{max-width:1100px;margin:0 auto;padding:5px;}
    .bld_5_0_0_0_{padding:5px;min-height:412.0723571777344px;align-items:center;justify-content:center;}
    .bld_5_0_0_0_0_{color:#ffffff;text-align:left;text-transform:lowercase;letter-spacing:4.6px;line-height:1.5em;font-family:Montserrat;font-size:2.6em;font-weight:800;}
    .bld_5_0_0_1_{padding:5px;}
    .bld_6_{max-width:calc(100% - 0px);margin:0px 0px;padding:5px;min-height:50.45660400390625px;}
    .bld_6_0_{padding:5px;min-height:26.465286254882812px;}
    .bld_7_{max-width:1300px;margin:0px auto;padding:0px;min-height:267.3333435058594px;background-color:rgba(237,237, 237, 1);background-image:none;background-size:initial;background-position:initial;background-repeat:initial;}
    .bld_7_0_{padding:5px;min-height:282.3420104980469px;}
    .bld_7_0_0_{max-width:1100px;margin:0 auto;padding:5px;}
    .bld_7_0_0_0_{padding:5px;min-height:270.359375px;align-items:center;justify-content:center;}
    .bld_7_0_0_0_0_{color:#000000;}
    .bld_7_0_0_0_1_{color:#000000;}
    .bld_7_1_{padding:5px;background-image:url("https://images.pexels.com/photos/7129700/pexels-photo-7129700.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");background-size:cover;background-position:center center;background-repeat:repeat;background-attachment:initial;}
    .bld_8_{max-width:calc(100% - 0px);margin:0px 0px;padding:5px;min-height:86.3084487915039px;}
    .bld_8_0_{padding:5px;min-height:-176.64581298828125px;}
    .bld_9_{max-width:1100px;margin:0 auto;padding:5px;}
    .bld_9_0_{padding:5px;min-height:54.9398193359375px;align-items:center;justify-content:flex-start;}
    .bld_9_0_0_{color:#000000;text-align:center;text-transform:none;letter-spacing:1px;line-height:2.5em;}
    .bld_10_{max-width:calc(100% - 0px);margin:0px 0px;padding:5px;min-height:86.3084487915039px;}`

    return (
        <div class="webPagePrev">
            <style>{css}
            </style>
            <div class="web_page_preview">
                <header class="wd-row bld_0_">
                    <div class="wd wd-12 bld_0_0_">
                        <div class="wd-row bld_0_0_0_">
                            <div class="wd wd-3 bld_0_0_0_0_">
                                <h1 class=" bld_0_0_0_0_0_">Website Builder</h1>
                            </div>
                            <div class="wd wd-6 bld_0_0_0_1_">
                                <nav data-navigation-menu="true" class=" bld_0_0_0_1_0_">
                                    <ul class=" bld_0_0_0_1_0_0_">
                                        <li class=" bld_0_0_0_1_0_0_0_"><Link to="/" target="_self" class=" bld_0_0_0_1_0_0_0_0_">Home</Link></li>
                                        <li class=" bld_0_0_0_1_0_0_1_"><a href="https://github.com/abhibagul/" target="_blank" class=" bld_0_0_0_1_0_0_1_0_">My Github</a></li>
                                    </ul>
                                </nav>
                            </div>
                            <div class="wd wd-3 bld_0_0_0_2_">
                                <nav data-navigation-menu="true" class=" bld_0_0_0_2_0_">
                                    <ul class=" bld_0_0_0_2_0_0_">
                                        <li class=" bld_0_0_0_2_0_0_0_"><Link to="/login" target="_self" class=" bld_0_0_0_2_0_0_0_0_">Login</Link></li>
                                        <li class=" bld_0_0_0_2_0_0_1_"><Link to="/signup" target="_self" class=" bld_0_0_0_2_0_0_1_0_">Get Started</Link></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </header>
                <div class="wd-row bld_1_">
                    <div class="wd wd-12 bld_1_0_">
                        <div class="wd-row bld_1_0_0_">
                            <div class="wd wd-12 bld_1_0_0_0_">
                                <h1 class=" bld_1_0_0_0_0_">🌍 This is open source Project</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="wd-row bld_2_">
                    <div class="wd wd-12 bld_2_0_">
                        <div class="wd-row bld_2_0_0_">
                            <div class="wd wd-12 bld_2_0_0_0_">
                                <h1 class=" bld_2_0_0_0_0_">
                                    Build More than a
                                    <div>Website..</div>
                                </h1>
                                <p class=" bld_2_0_0_0_1_">Design your website as the way you want it&nbsp;
                                    <div>
                                        with just some clicks here some clicks there...&nbsp;
                                        <div>and within blink you will have the&nbsp;</div>
                                        <div>website as you imagined!</div>
                                    </div>
                                </p><Link class=" bld_2_0_0_0_2_" to="/signup">Get started</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="wd-row bld_3_">
                    <div class="wd wd-12 bld_3_0_">
                        <div class="wd-row bld_3_0_0_">
                            <div class="wd wd-6 bld_3_0_0_0_"><img src="https://images.pexels.com/photos/5137664/pexels-photo-5137664.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=650&amp;w=940" alt="Long exposure of small vibrant Sun in light blue pink sky over mountain range and cliffs next to coast of endless wavy ocean in evening at dawn by Sami Anas" height="auto" width="80%" class="bld_3_0_0_0_0_ animate" data-has-animation="true" /></div>
                            <div class="wd wd-6 bld_3_0_0_1_">
                                <h1 class=" bld_3_0_0_1_0_">
                                    From the animations,
                                    <div>It has everything!</div>
                                </h1>
                                <p class=" bld_3_0_0_1_1_">It is as easy as clicking on the magic wand and selecting the effect!
                                    <div><br /></div>
                                    <div>There are tonns of effects and customizations waiting!</div>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="wd-row bld_4_">
                    <div class="wd wd-12 bld_4_0_">
                        <div class="wd-row bld_4_0_0_">
                            <div class="wd wd-4 bld_4_0_0_0_">
                                <img src="https://images.pexels.com/photos/192273/pexels-photo-192273.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=650&amp;w=940" alt="White Turned on Samsung Android Smartphone by Lisa Fotios" height="auto" width="90%" class=" bld_4_0_0_0_0_" />
                                <h1 class=" bld_4_0_0_0_1_">Has Pexels images integration</h1>
                                <p class=" bld_4_0_0_0_2_">Stop wasting time on finding the perfect royalty free image, the image search feature allows you to find the perfect image match for you!</p>
                            </div>
                            <div class="wd wd-4 bld_4_0_0_1_">
                                <h1 class=" bld_4_0_0_1_0_">
                                    Create&nbsp;
                                    <div>some beautiful gradients!</div>
                                </h1>
                                <p class=" bld_4_0_0_1_1_">It is as easy as picking the colors and adjusting the sliders!</p>
                            </div>
                            <div class="wd wd-4 bld_4_0_0_2_">
                                <h1 class=" bld_4_0_0_2_0_">How can we forget some emojis 😎?&nbsp;</h1>
                                <p class=" bld_4_0_0_2_1_">We need emoji! Everywhere! In the lists also!</p>
                                <ul class=" bld_4_0_0_2_2_">
                                    <li class=" bld_4_0_0_2_2_0_">Emoji List Item</li>
                                    <ul class=" bld_4_0_0_2_2_1_">
                                        <li class=" bld_4_0_0_2_2_1_0_">&nbsp;have emoji?</li>
                                    </ul>
                                    <li class=" bld_4_0_0_2_2_2_">Emoji List Item 2</li>
                                    <ul class=" bld_4_0_0_2_2_3_">
                                        <li class=" bld_4_0_0_2_2_3_0_">sub Emoji (mind Blown)</li>
                                    </ul>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="wd-row bld_5_">
                    <div class="wd wd-12 bld_5_0_">
                        <div class="wd-row bld_5_0_0_">
                            <div class="wd wd-6 bld_5_0_0_0_">
                                <h1 class=" bld_5_0_0_0_0_">
                                    Deep under there are some cool,
                                    <div>Parallax Effects waiting for you!</div>
                                </h1>
                            </div>
                            <div class="wd wd-6 bld_5_0_0_1_"></div>
                        </div>
                    </div>
                </div>
                <div class="wd-row bld_6_">
                    <div class="wd wd-12 bld_6_0_"></div>
                </div>
                <div class="wd-row bld_7_">
                    <div class="wd wd-8 bld_7_0_">
                        <div class="wd-row bld_7_0_0_">
                            <div class="wd wd-12 bld_7_0_0_0_">
                                <h1 class=" bld_7_0_0_0_0_">Why wait?</h1>
                                <h1 class=" bld_7_0_0_0_1_">Let's Get Started Creating Something New!</h1>
                            </div>
                        </div>
                    </div>
                    <div class="wd wd-4 bld_7_1_"></div>
                </div>
                <div class="wd-row bld_8_">
                    <div class="wd wd-12 bld_8_0_"></div>
                </div>
                <div class="wd-row bld_9_">
                    <div class="wd wd-12 bld_9_0_">
                        <p class=" bld_9_0_0_">WebPage Builder - Open Source Project
                            <div><a href="https://github.com/abhibagul/Wix-Clone" target="_blank" rel="noopner noreffer">https://github.com/abhibagul/Wix-Clone/</a><br /></div>
                        </p>
                    </div>
                </div>
                <div class="wd-row bld_10_"></div>
            </div>
        </div>
    )
}

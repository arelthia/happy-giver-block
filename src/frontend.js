import React from 'react'
import ReactDOM from 'react-dom'
import { RadioControl } from '@wordpress/components';
import "./frontend.scss"

const happyGiverDivs = document.querySelectorAll(".happy-giver-update-me")

happyGiverDivs.forEach(function(div){
	const data = JSON.parse(div.querySelector("pre").innerHTML)
	ReactDOM.render(<HappyForm {...data}  />,div)
	div.classList.remove("happy-giver-update-me")
})


function HappyForm(props) {

	return (
		<div className="happy-giver-wrapper" style={{backgroundColor: props.bgColor}}>
			<div className="amounts"  tabindex="1">
				<div className="happy-giver-form-wrap amount_set">
					<span className="happy-giver-radio" id="amount">
						{props.amounts.map(function(amount, index) {
							return <span className="happy-giver-list-item" style={{color: props.amountColor , backgroundColor: props.amountButtonColor , textAlign: "center"}}>
							<label for={"amount" + amount}>
							<input 
							type="radio" 
							value={amount} 
							name="amount" 
							id={"amount" + amount} 
							className="happy-giver-amounts"
							/>
							<span className="happy-giver-list-item-label">{amount}</span>
							</label></span>
						})}
					</span>
				</div>
				<div className={props.allowCustom ? 'custom-group':'custom-group-hide'} >
					<label for="happy-giver-amount-other" style={{color: props.amountColor , backgroundColor: props.amountButtonColor , textAlign: "center"}}>Custom</label>
					<span className="amount_custom"><input type="number"  id="happy-giver-amount-other" autocomplete="off" tabindex="2" /></span>
					
				</div>
				<input type="hidden"  id="happy-giver-amount-field" name="happy-giver-amount-field" required />
			</div>	
			<p><span className="divider">Information</span></p>
			<div className="happy-giver-info">
				<div className="field-group"><label for="happy-giver-firstname">First Name:</label><input type="text" id="happy-giver-firstname"  name="happy-giver-firstname" tabindex="3" required autocomplete='off' /></div>
				<div className="field-group"><label for="happy-giver-lastname">Last Name:</label><input type="text" id="happy-giver-lastname" name="happy-giver-lastname" tabindex="4" required autocomplete='off' /></div>
				
				<div className="field-group"><label for="happy-giver-email">Email:</label><input type="text" id="happy-giver-email"  name="happy-giver-email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" tabindex="5" required autocomplete='off'/></div>

				<div className="field-group"><label for="happy-giver-cardtype">Card Type:</label>
		   			<select id="happy-giver-cardtype"  name="happy-giver-cardtype" className="custom-select" tabindex="6" required style={{backgroundColor: 'inherit', border: 'none', padding: '.5rem', width: '100%'}}>
		   				<option value=" ">Select ...</option>
		         		<option value="Visa">Visa</option>
		         		<option value="MasterCard">MasterCard</option>
		         		<option value="Amex">Amex</option>
		         		<option value="Visa">Discover</option>
		         	</select>
		        </div>

		        <div className="field-group"><label for="happy-giver-cardnumber">Card Number:</label><input type="text" id="happy-giver-cardnumber" name="happy-giver-cardnumber" maxlength="20" tabindex="7" required autocomplete='off'/></div>

		        <div className="field-group"><label for="happy-giver-cardexp">Expiration:</label>
		   			<input type="text" id="happy-giver-cardexp" autocomplete="off" tabindex="8" placeholder="MM/YYYY" required />
					<input type="hidden" id="happy-giver-cardexp-month" name="happy-giver-cardexp-month" />
					<input type="hidden" id="happy-giver-cardexp-year" name="happy-giver-cardexp-year" />
				</div>


				<div className="field-group"><label for="happy-giver-cvv">Security Code:</label><input type="text" id="happy-giver-cvv" name="happy-giver-cvv" maxlength="4" tabindex="9" required autocomplete='off'/></div>
			</div>
			<div className={props.purposes.length > 0 ? '' : 'purpose-hide'} >
				<p><span className="divider">Purpose</span></p>
				<div className='purpose' tabindex="10" >
					<div className="happy-giver-form-wrap purpose_set">
						<span className="happy-giver-radio" id="purpose">
							{props.purposes.map(function(purpose) {
			   					return <span className="happy-giver-list-item" style={{color: props.purposeColor , backgroundColor: props.purposeButtonColor , textAlign: "center"}}>
						   					<label for={"purpose-" + purpose}>
							   					<input type="radio" id={"purpose-" + purpose} className="happy-giver-purposes" name="happy-giver-purpose" value={purpose} />
							   					<span className="happy-giver-list-item-label">{purpose}</span>
						   					</label>
			   							</span>
						})}
						</span>
					</div>
				</div>	
			</div>
		</div>
		)
}
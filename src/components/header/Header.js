import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { GlobalContext } from '../../context/GlobalState';

import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';

import './Header.css';

const Header = () => {
	const { basket, user, signOut } = useContext(GlobalContext);

	return (
		<div className='header'>
			{/* Logo */}
			<Link to='/'>
				<img
					src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
					alt='amazon logo'
					className='header_logo'
				/>
			</Link>

			{/* searchbox */}
			<div className='header_search'>
				<input className='header_searchInput' type='text' />
				<SearchIcon className='header_searchIcon' />
			</div>

			{/* Header nav */}
			<div className='header_nav'>
				{/* Login */}
				<Link to={'/login'}>
					<div onClick={signOut} className='header_option'>
						<span className='header_optionLineOne'>
							Hello {!user ? 'Guest' : user.email.split('@')[0]}
						</span>
						<span className='header_optionLineTwo'>
							{user ? 'Sign Out' : 'Sign In'}
						</span>
					</div>
				</Link>

				{/* orders */}
				<Link to={'/orders'}>
					<div className='header_option'>
						<span className='header_optionLineOne'>Returns</span>
						<span className='header_optionLineTwo'>& Orders</span>
					</div>
				</Link>

				{/* Prime */}
				<div className='header_option'>
					<span className='header_optionLineOne'>Your</span>
					<span className='header_optionLineTwo'>Prime</span>
				</div>

				{/* basket */}
				<Link to='/checkout'>
					<div className='header_optionBasket'>
						<ShoppingBasket />
						<span className='header_optionLineTwo header_basketCount'>
							{basket?.length}
						</span>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Header;

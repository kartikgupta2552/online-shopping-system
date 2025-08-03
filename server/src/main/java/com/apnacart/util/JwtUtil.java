package com.apnacart.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import com.apnacart.exception.JwtTokenExpiredException;
import com.apnacart.exception.JwtTokenInvalidException;

//swiss army knife for all JWT operations
@Component
public class JwtUtil {
	//secret key for signing JWT tokens
	private static final String SECRET_KEY = 
			"secRetKeyForApnaCartcreaTedByTu$h@rK@rT!kAnd@k@nk$h@vErYsEcurE";
	
	//token expiration time(24hrs in ms)
	private static final long EXPIRATION_TIME = 86400000; //24h*60m*60s*1000ms
	
	//generate actual secret key for signing
	private final SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
	
	/*
	 * 1. generate token method
	 * 2. validate token method
	 * 3. extract data/values from the token
	 * 		like userId, userRole etc.
	 */
	
	//generate JWT for authenticated(logged in) user
	/*
	 * @param userId
	 * @param email
	 * @param role
	 * @param status
	 * @return ->  JWT returned as string 
	 */
	public String generateToken(Long userId, String email, String userRole, String userStatus) {
		Date now = new Date();
		Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);
		
		return Jwts.builder() //Jwts.builder() is the main JWT factory
				.setSubject(email) //who the token is for -> email is set as identifier
				//we used email instead of id because when we decode the token, using email we can immediately identy
				//who it belongs to as opposed to userId which won't give much information compared to email
				.claim("userId",userId) //stores userId in the token -> to do db operations
				.claim("userRole",userRole) // stores userRole in the token -> to know what permissions(authorization) the user has
				.claim("userStatus", userStatus) // stores userStatus in the token
				.setIssuedAt(now) // token creation time
				.setExpiration(expiryDate) // token expiry time
				.signWith(key,SignatureAlgorithm.HS256) //signs the token with our secret key using sha256 algorithm
				.compact(); //this builds the final token string
	}//generateToken() ends
	
	//token validation method
	/*
	 * validate the JWT and return the "claims"(stored info inside the token, eg userId, role) if any
	 * @param token -> JWT token string
	 * @return Claims object which contains the token data | claim = data payload of a JWT token
	 * @throws JwtException if the token is invalid/expired/tampered with.
	 * 
	 * claims = JSON Map type object(string, object)
	 */
	public Claims validateToken(String token) {
		try {
			return Jwts.parserBuilder() //decrpyt the token string
					.setSigningKey(key) // use secret key to verify the signature
					.build() // build the parser(decrypt)
					.parseClaimsJws(token) // parse and validate the stored values
					.getBody(); // extract the stored values into body(payload data)
		} catch (ExpiredJwtException e) {
	        // Token is expired - throw our custom exception
	        throw new JwtTokenExpiredException("JWT token has expired: " + e.getMessage(), e);
	    } catch (MalformedJwtException e) {
	        // Token structure is different 
	        throw new JwtTokenInvalidException("JWT token is malformed: " + e.getMessage(), e);
	    } catch (IllegalArgumentException e) {
	        // Token is null or empty
	        throw new JwtTokenInvalidException("JWT token is null or empty: " + e.getMessage(), e);
	    } catch (JwtException e) {
	        // Any other JWT-related error
	        throw new JwtTokenInvalidException("JWT token is invalid: " + e.getMessage(), e);
	    }
	}//validateToken() ends
	
	//extract values from the JWT
	
	/*
	 * extract email from the jwt
	 * @param token - JWT string
	 * @return - user's email address as String
	 */
	public String getEmailFromToken(String token) {
		Claims claims = validateToken(token);
		return claims.getSubject(); //we stored email as subject in generateToken()
	}//getEmailFromToken() ends
	
	/*
	 * extract userId from jwt
	 * @param token - jwt string
	 * @return - user's userId as long
	 */
	public Long getUserIdFromToken(String token) {
		Claims claims = validateToken(token);
		return claims.get("userId",Long.class); // extract custom userId claim/value
	}//getUserIdFromToken() ends
	
	/*
	 * extract userRole from jwt
	 * @param token - jwt token
	 * @return - user's role as String
	 */
	public String getUserRoleFromToken(String token) {
		Claims claims = validateToken(token);
		return claims.get("userRole",String.class); // extract custom userRole claim/value
	}//getUserRoleFromToken() ends
	
	/*
	 * extract userStatus from jwt
	 * @param token - jwt token
	 * @return - user's status as String
	 */
	public String getUserStatusFromToken(String token) {
		Claims claims = validateToken(token);
		return claims.get("userStatus",String.class); // extract custom userRole claim/value
	}//getUserStatusFromToken() ends
	
	//check token expiration
	/*
	 * check if the jwt is expired or not
	 * @param token - jwt string
	 * return true if expired, false if still valid
	 */
	
	public boolean isTokenExpired(String token) {
		try {
			Claims claims = validateToken(token);
			Date expiration = claims.getExpiration();
			return expiration.before(new Date()); // compare the expiration with current time
		} catch (JwtException e) {
			return true; // if the token is invalid, consider it as expired
		}
	}//isTokenExpired() ends
	

}//JwtUtil ends
